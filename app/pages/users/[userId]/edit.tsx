import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, UserForm} from "app/users/components/UserForm"
import updateUser from "app/users/mutations/updateUser"
import getUser from "app/users/queries/getUser"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter} from "blitz"
import {Suspense} from "react"

export const EditUser = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [user, {setQueryData}] = useQuery(getUser, {id: userId})
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <>
      <Head>
        <title>Edit User {user.id}</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <h1>Edit User {user.id}</h1>
        <pre>{JSON.stringify(user)}</pre>

        <UserForm
          submitText="Update User"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateUser}
          initialValues={user}
          onSubmit={async (values) => {
            try {
              const updated = await updateUserMutation({
                id: user.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/users/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditUserPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUser />
      </Suspense>

      <p>
        <Link href="/users">
          <a>Users</a>
        </Link>
      </p>
    </div>
  )
}

EditUserPage.authenticate = true
EditUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditUserPage
