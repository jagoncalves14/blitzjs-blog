import Layout from "app/core/layouts/Layout"
import deleteProfile from "app/profiles/mutations/deleteProfile"
import getProfile from "app/profiles/queries/getProfile"
import {BlitzPage, Head, Link, useMutation,useParam, useQuery, useRouter} from "blitz"
import {Suspense} from "react"

export const Profile = () => {
  const router = useRouter()
  const profileId = useParam("profileId", "number")
  const [deleteProfileMutation] = useMutation(deleteProfile)
  const [profile] = useQuery(getProfile, {id: profileId})

  return (
    <>
      <Head>
        <title>Profile {profile.id}</title>
      </Head>

      <div>
        <h1>Profile {profile.id}</h1>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

        <Link href={`/profiles/${profile.id}/edit`}>
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">Edit</a>
        </Link>

        <button
          className="text-md leading-none font-semibold rounded bg-red-600 text-white transition-all py-2 px-6 ml-4"
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProfileMutation({id: profile.id})
              router.push("/profiles")
            }
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowProfilePage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto sm:px-6">
      <div className="w-full text-right">
        <Link href="/profiles">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">Profiles</a>
        </Link>
      </div>

      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </div>
    </div>
  )
}

ShowProfilePage.authenticate = true
ShowProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProfilePage
