import Layout from "app/core/layouts/Layout"
import deletePost from "app/posts/mutations/deletePost"
import getPost from "app/posts/queries/getPost"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter, useSession} from "blitz"
import {Suspense} from "react"

export const Post = () => {
  const session = useSession()
  const isAuthenticated = session.userId
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, {id: postId})

  return (
    <>
      <Head>
        <title>Blitzerplate - {post.title}</title>
      </Head>

      <div>
        <div className="block space-x-4">
          <label className="rounded py-1 px-2 bg-indigo-200 text-indigo-600 uppercase text-xs font-bold">
            Post ID - {post.id}
          </label>
        </div>
        {isAuthenticated && (
          <div className="mt-8">
            <Link href={`/posts/${post.id}/edit`}>
              <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
                Edit
              </a>
            </Link>

            <button
              className="text-md leading-none font-semibold rounded bg-red-600 text-white transition-all py-2 px-6 ml-4"
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deletePostMutation({id: post.id})
                  router.push("/posts")
                }
              }}
            >
              Delete
            </button>
          </div>
        )}

        <h1 className="text-4xl font-bold mt-4 mb-8">{post.title}</h1>

        <pre className="rounded bg-indigo-200 p-8">{JSON.stringify(post, null, 2)}</pre>

        <div
          className="inline-block w-full mt-10"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
      </div>
    </>
  )
}

const ShowPostPage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto sm:px-6 pb-24">
      <div className="w-full text-right">
        <Link href="/posts">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Posts
          </a>
        </Link>
      </div>

      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <Post />
        </Suspense>
      </div>
    </div>
  )
}

// ShowPostPage.authenticate = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
