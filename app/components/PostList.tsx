import { usePaginatedQuery, useRouter } from "blitz"
import PostItem from "app/components/PostItem"
import getPosts from "app/posts/queries/getPosts"

type Props = {
  postsPerPage?: number
}

export default function PostsList({ postsPerPage = 100 }: Props) {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [posts, hasMore] = usePaginatedQuery(getPosts, {
    orderBy: { id: "asc" },
    skip: postsPerPage * page,
    take: postsPerPage,
  })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className={"container"}>
      {posts.posts.length ? (
        <div className={"posts"}>
          <ul className={"post-list"}>
            {posts.map((post, i) => (
              <li key={i}>
                <PostItem post={post} />
              </li>
            ))}
          </ul>
          <button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </button>
          <button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </button>
        </div>
      ) : (
        "No posts"
      )}

      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .post-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  )
}
