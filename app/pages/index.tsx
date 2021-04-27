import PostsThumbnail from "app/core/components/PostsThumbnail"
import Layout from "app/core/layouts/Layout"
import getPosts from "app/posts/queries/getPosts"
import {BlitzPage, Head, usePaginatedQuery} from "blitz"
import {Suspense} from "react"

const HomePosts = () => {
  const [{posts}] = usePaginatedQuery(getPosts, {
    orderBy: {id: "asc"},
    take: 8,
  })
  const hasPosts = posts.length > 0

  return (
    <div>
      {hasPosts ? (
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-row justify-between border-b-2 font-bold text-xl border-indigo-200 py-4"
            >
              <PostsThumbnail post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You currently have no posts.</p>
      )}
    </div>
  )
}

const Home: BlitzPage = () => (
  <>
    <Head>
      <title>BlitzBlog - Homepage</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex-grow mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 md:mt-8 lg:px-8 pb-24">
      <div className="container mx-auto flex px-6">
        <h1 className="text-3xl lg:text-6xl font-bold leading-none">BlitzBlog</h1>
      </div>
    </main>

    <section>
      <div className="container mx-auto flex px-6 mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <HomePosts />
        </Suspense>
      </div>
    </section>
  </>
)

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="BlitzBlog - Homepage">{page}</Layout>

export default Home
