import Layout from "app/core/layouts/Layout"
import getUsers from "app/users/queries/getUsers"
import {BlitzPage, Head, Link, usePaginatedQuery, useRouter} from "blitz"
import {Suspense} from "react"

const ITEMS_PER_PAGE = 100

export const UsersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{users, hasMore}] = usePaginatedQuery(getUsers, {
    orderBy: {id: "asc"},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({query: {page: page - 1}})
  const goToNextPage = () => router.push({query: {page: page + 1}})

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-b-2 border-indigo-200">
            <Link href={`/users/${user.id}`}>
              <a>{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      {users.length > 0 && (
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

const UsersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <p>
          <Link href="/users/new">
            <a>Create User</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <UsersList />
        </Suspense>
      </div>
    </>
  )
}

UsersPage.authenticate = true
UsersPage.getLayout = (page) => <Layout>{page}</Layout>

export default UsersPage
