import { Suspense } from "react"
import { Head, Link, BlitzPage } from "blitz"
import Layout from "app/components/Layout"
import PostsList from "app/components/PostList"

const PostsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div>
        <p>
          <Link href="/posts/new">
            <a>Create Post</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PostsList />
        </Suspense>
      </div>
    </>
  )
}

PostsPage.authenticate = true
PostsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PostsPage
