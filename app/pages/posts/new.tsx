import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, PostForm} from "app/posts/components/PostForm"
import createPost from "app/posts/mutations/createPost"
import {BlitzPage, Link, useMutation, useRouter, useSession} from "blitz"
import {Suspense} from "react"

const PostFormHandler = () => {
  const session = useSession()
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)
  const userId = session.userId

  return (
    <PostForm
      submitText="Create Post"
      onSubmit={async (values) => {
        try {
          const payload = {
            authorId: userId as number,
            data: {
              ...values,
              published: values.published || false,
            },
          }

          const postResponse = await createPostMutation(payload)
          router.push(`/posts/${postResponse.id}`)
        } catch (error) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}

const NewPostPage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto mt-20 sm:px-6 pb-24">
      <div className="w-full text-right">
        <Link href="/posts">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Back to posts
          </a>
        </Link>
      </div>

      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-8">Create New Post</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <PostFormHandler />
        </Suspense>
      </div>
    </div>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
