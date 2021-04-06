import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, ProfileForm} from "app/profiles/components/ProfileForm"
import createProfile from "app/profiles/mutations/createProfile"
import {BlitzPage, useMutation, useRouter} from "blitz"

const NewProfilePage: BlitzPage = () => {
  const router = useRouter()
  const [createProfileMutation] = useMutation(createProfile)

  return (
    <div className="flex-grow container mx-auto mt-24 sm:px-6">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-8">Create New Profile</h1>

        <ProfileForm
          submitText="Create Profile"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreateProfile}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const profile = await createProfileMutation(values)
              router.push(`/profiles/${profile.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </div>
  )
}

NewProfilePage.authenticate = true
NewProfilePage.getLayout = (page) => <Layout title={"Create New Profile"}>{page}</Layout>

export default NewProfilePage
