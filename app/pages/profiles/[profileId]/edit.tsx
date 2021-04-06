import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, ProfileForm} from "app/profiles/components/ProfileForm"
import updateProfile from "app/profiles/mutations/updateProfile"
import getProfile from "app/profiles/queries/getProfile"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter} from "blitz"
import {Suspense} from "react"

export const EditProfile = () => {
  const router = useRouter()
  const profileId = useParam("profileId", "number")
  const [profile, {setQueryData}] = useQuery(getProfile, {id: profileId})
  const [updateProfileMutation] = useMutation(updateProfile)

  return (
    <>
      <Head>
        <title>Edit Profile {profile.id}</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <h1>Edit Profile {profile.id}</h1>
        <pre>{JSON.stringify(profile)}</pre>

        <ProfileForm
          submitText="Update Profile"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProfile}
          initialValues={profile}
          onSubmit={async (values) => {
            try {
              const updated = await updateProfileMutation({
                id: profile.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/profiles/${updated.id}`)
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

const EditProfilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProfile />
      </Suspense>

      <p>
        <Link href="/profiles">
          <a>Profiles</a>
        </Link>
      </p>
    </div>
  )
}

EditProfilePage.authenticate = true
EditProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProfilePage
