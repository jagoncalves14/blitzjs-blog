import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/components/Layout"
import getPost from "app/posts/queries/getPost"
import deletePost from "app/posts/mutations/deletePost"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })

  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>

      <div>
        <h1>Post {post.id}</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>

        <Link href={`/posts/${post.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePostMutation({ id: post.id })
              router.push("/posts")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowPostPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.authenticate = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
