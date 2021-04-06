import Layout from "app/core/layouts/Layout"
import {FORM_ERROR,PostForm} from "app/posts/components/PostForm"
import createPost from "app/posts/mutations/createPost"
import {BlitzPage, useMutation, useRouter, useSession} from "blitz"

const NewPostPage: BlitzPage = () => {
  const session = useSession()
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)
  const userId = session.userId

  return (
    <div className="flex-grow container mx-auto mt-24 sm:px-6">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-8">Create New Post</h1>

        <PostForm
          submitText="Create Post"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreatePost}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const payload = Object.assign(values, {authorId: userId})
              const post = await createPostMutation(payload)
              router.push(`/posts/${post.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </div>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
