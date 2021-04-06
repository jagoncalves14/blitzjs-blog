import Layout from "app/core/layouts/Layout"
import getTags from "app/tags/queries/getTags"
import {BlitzPage, Head, Link, usePaginatedQuery, useRouter} from "blitz"
import {Suspense} from "react"

const ITEMS_PER_PAGE = 100

export const TagsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{tags, hasMore}] = usePaginatedQuery(getTags, {
    orderBy: {id: "asc"},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({query: {page: page - 1}})
  const goToNextPage = () => router.push({query: {page: page + 1}})

  return (
    <div>
      <ul>
        {tags &&
          tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/tags/${tag.id}`}>
                <a>{tag.name}</a>
              </Link>
            </li>
          ))}
      </ul>

      {tags.length > 0 && (
        <div className="mt-12">
          <button
            className="text-md leading-none font-semibold rounded bg-indigo-200 text-indigo-600 transition-all py-2 px-6"
            disabled={page === 0}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <button
            className="text-md leading-none font-semibold rounded bg-indigo-200 text-indigo-600 transition-all py-2 px-6 ml-8"
            disabled={!hasMore}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

const TagsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <p>
          <Link href="/tags/new">
            <a>Create Tag</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TagsList />
        </Suspense>
      </div>
    </>
  )
}

TagsPage.authenticate = true
TagsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TagsPage
