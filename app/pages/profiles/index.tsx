import Layout from "app/core/layouts/Layout"
import getProfiles from "app/profiles/queries/getProfiles"
import {BlitzPage, Head, Link, usePaginatedQuery, useRouter} from "blitz"
import {Suspense} from "react"

const ITEMS_PER_PAGE = 100

export const ProfilesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{profiles, hasMore}] = usePaginatedQuery(getProfiles, {
    orderBy: {id: "asc"},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({query: {page: page - 1}})
  const goToNextPage = () => router.push({query: {page: page + 1}})

  return (
    <div>
      <ul>
        {profiles &&
          profiles.map((profile) => (
            <li key={profile.id}>
              <Link href={`/profiles/${profile.id}`}>
                <a>{profile.user.name}</a>
              </Link>
            </li>
          ))}
      </ul>

      {profiles.length > 0 && (
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

const ProfilesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Profiles</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <p>
          <Link href="/profiles/new">
            <a>Create Profile</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProfilesList />
        </Suspense>
      </div>
    </>
  )
}

ProfilesPage.authenticate = true
ProfilesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProfilesPage
