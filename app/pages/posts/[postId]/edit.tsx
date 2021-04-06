import createCategory from "app/categories/mutations/createCategory"
import Layout from "app/core/layouts/Layout"
import {FORM_ERROR,PostForm} from "app/posts/components/PostForm"
import updatePost from "app/posts/mutations/updatePost"
import getPost from "app/posts/queries/getPost"
import createTag from "app/tags/mutations/createTag"
import {BlitzPage,Head, Link, useMutation, useParam, useQuery, useRouter} from "blitz"
import { Category, Post } from "db"
import {Suspense} from "react"

export const EditPost = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, {setQueryData}] = useQuery(getPost, {id: postId})
  const [updatePostMutation] = useMutation(updatePost)

  return (
    <>
      <Head>
        <title>Blitzerplate - Edit "{post.title}"</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <div className="block space-x-4">
          <label className="rounded py-1 px-2 bg-indigo-200 text-indigo-600 uppercase text-xs font-bold">Post ID - {post.id}</label>
          <label className="rounded py-1 px-2 bg-green-200 text-green-600 uppercase text-xs font-bold">EDITING</label>
        </div>
        <h1 className="text-4xl font-bold mt-4 mb-8">{post.title}</h1>

        <pre className="rounded bg-indigo-200 p-8">{JSON.stringify(post, null, 2)}</pre>

        <div className="mt-8">
          <PostForm
            submitText="Update Post"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            // schema={UpdatePost}
            initialValues={post}
            onSubmit={async (values) => {
              let payload = {
                id: post.id,
                ...values,
              }

              try {
                const updated = await updatePostMutation(payload)
                await setQueryData(updated as Post & { categories: Category[]; })
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
      </div>
    </>
  )
}

const EditPostPage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto sm:px-6 pb-24">
      <div className="w-full text-right">
        <Link href="/posts">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">Back to posts</a>
        </Link>
      </div>

      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <EditPost />
        </Suspense>
      </div>
    </div>
  )
}

EditPostPage.authenticate = true
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPostPage
