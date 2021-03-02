import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/components/Layout"
import createPost from "app/posts/mutations/createPost"
import { PostForm, FORM_ERROR } from "app/posts/components/PostForm"

const NewPostPage: BlitzPage = () => {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)

  return (
    <div>
      <h1>Create New Post</h1>

      <PostForm
        submitText="Create Post"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePost}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const post = await createPostMutation(values)
            router.push(`/posts/${post.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </p>
    </div>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
