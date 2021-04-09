import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, PostForm} from "app/posts/components/PostForm"
import updatePost from "app/posts/mutations/updatePost"
import getPost from "app/posts/queries/getPost"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter, useSession} from "blitz"
import {Suspense} from "react"

const PostFormHandler = () => {
  const session = useSession()
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, {setQueryData}] = useQuery(getPost, {id: postId})
  const [updatePostMutation] = useMutation(updatePost)
  const userId = session.userId

  return (
    <PostForm
      submitText="Update Post"
      initialValues={post}
      onSubmit={async (values) => {
        try {
          const payload = {
            postId: post.id,
            authorId: userId as number,
            data: {
              title: values.title,
              content: values.content,
              published: values.published || false,
              categories: values.categories,
              tags: values.tags,
            },
          }

          const postUpdateResponse = await updatePostMutation(payload)
          await setQueryData(postUpdateResponse)
          router.push(`/posts/${postUpdateResponse.id}`)
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

export const EditPost = () => {
  const postId = useParam("postId", "number")
  const [post] = useQuery(getPost, {id: postId})

  return (
    <>
      <Head>
        <title>Blitzerplate - Edit {post.title}</title>
      </Head>

      <div className="block space-x-4">
        <span className="rounded py-1 px-2 bg-indigo-200 text-indigo-600 uppercase text-xs font-bold">
          Post ID - {post.id}
        </span>
        <span className="rounded py-1 px-2 bg-green-200 text-green-600 uppercase text-xs font-bold">
          EDITING
        </span>
      </div>

      <h1 className="text-4xl font-bold mt-4 mb-8">{post.title}</h1>

      {/* <pre className="rounded bg-indigo-200 p-8">{JSON.stringify(post, null, 2)}</pre> */}

      <div className="mt-8">
        <PostFormHandler />
      </div>
    </>
  )
}

const EditPostPage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto sm:px-6 pb-24">
      <div className="w-full text-right">
        <Link href="/posts">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Back to posts
          </a>
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
