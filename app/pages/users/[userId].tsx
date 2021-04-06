import Layout from "app/core/layouts/Layout"
import deleteUser from "app/users/mutations/deleteUser"
import getUser from "app/users/queries/getUser"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter} from "blitz"
import {Suspense} from "react"

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, {id: userId})

  return (
    <>
      <Head>
        <title>User {user.id}</title>
      </Head>

      <div>
        <h1 className="text-4xl font-bold mb-8 text-center">User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Link href={`/users/${user.id}/edit`}>
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Edit
          </a>
        </Link>

        <button
          className="text-md leading-none font-semibold rounded bg-red-600 text-white transition-all py-2 px-6 ml-4"
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserMutation({id: user.id})
              router.push("/users")
            }
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto sm:px-6">
      <div className="w-full text-right">
        <Link href="/users">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Users
          </a>
        </Link>
      </div>

      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <User />
        </Suspense>
      </div>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
