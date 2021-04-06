import Layout from "app/core/layouts/Layout"
import deletePost from "app/posts/mutations/deletePost"
import getPosts from "app/posts/queries/getPosts"
import {BlitzPage, Head, Link, useMutation,usePaginatedQuery, useRouter, useSession} from "blitz"
import {Suspense} from "react"

const ITEMS_PER_PAGE = 20

export const PostsList = () => {
  const session = useSession()
  const isAuthenticated = session.userId

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{posts, hasMore}] = usePaginatedQuery(getPosts, {
    orderBy: {id: "asc"},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const hasLess = page > 0

  const hasPosts = posts.length > 0
  const goToPreviousPage = () => router.push({query: {page: page - 1}})
  const goToNextPage = () => router.push({query: {page: page + 1}})

  const [deletePostMutation] = useMutation(deletePost)

  return (
    <div>
      {hasPosts ? (
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="flex flex-row justify-between border-b-2 font-bold text-xl border-indigo-200 py-4">
            <Link href={`/posts/${post.id}`}>
              <a className="mt-1">{post.title}</a>
            </Link>

            {isAuthenticated && (
              <div>
                <Link href={`/posts/${post.id}/edit`}>
                  <a className="inline-block text-xs leading-none font-semibold rounded border border-indigo-600 text-indigo-600 transition-all py-2 px-6">Edit</a>
                </Link>

                <button
                  className="text-xs leading-none font-semibold rounded border border-red-600 text-red-600 transition-all py-2 px-6 ml-4"
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
          </li>
        ))}
      </ul>
      ) : (
        <p className="text-gray-600">You currently have no posts.</p>
      )}

      {hasPosts && (
        <div className="mt-24 space-x-8">
          {hasLess && (
            <button className="text-md leading-none font-semibold rounded bg-indigo-200 text-indigo-600 transition-all py-2 px-6" disabled={page === 0} onClick={goToPreviousPage}>
              Previous
            </button>
          )}
          {hasMore && (
            <button className="text-md leading-none font-semibold rounded bg-indigo-200 text-indigo-600 transition-all py-2 px-6" disabled={!hasMore} onClick={goToNextPage}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export const CreatePostButton = () => {
  const session = useSession()
  const isAuthenticated = session.userId

  if (!isAuthenticated) return null

  return (
    <Link href="/posts/new">
      <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">Create Post</a>
    </Link>
  )
}

const PostsPage: BlitzPage = () => {
  return (
    <>
      <div className="flex-grow container mx-auto mt-24 sm:px-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl">Posts List</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <CreatePostButton />
          </Suspense>
        </div>

        <div className="mt-12">
          <Suspense fallback={<div>Loading...</div>}>
            <PostsList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

PostsPage.suppressFirstRenderFlicker = true
PostsPage.getLayout = (page) => <Layout title="Blitzerplate - Posts">{page}</Layout>

export default PostsPage
