import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/components/Layout"
import getPost from "app/posts/queries/getPost"
import updatePost from "app/posts/mutations/updatePost"
import { PostForm, FORM_ERROR } from "app/posts/components/PostForm"

export const EditPost = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, { setQueryData }] = useQuery(getPost, { id: postId })
  const [updatePostMutation] = useMutation(updatePost)

  return (
    <>
      <Head>
        <title>Edit Post {post.id}</title>
      </Head>

      <div>
        <h1>Edit Post {post.id}</h1>
        <pre>{JSON.stringify(post)}</pre>

        <PostForm
          submitText="Update Post"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePost}
          initialValues={post}
          onSubmit={async (values) => {
            try {
              const updated = await updatePostMutation({
                id: post.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/posts/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>

      <p>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </p>
    </div>
  )
}

EditPostPage.authenticate = true
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPostPage
