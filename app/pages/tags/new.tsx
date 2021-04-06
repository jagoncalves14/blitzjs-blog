import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, TagForm} from "app/tags/components/TagForm"
import createTag from "app/tags/mutations/createTag"
import {BlitzPage, useMutation, useRouter} from "blitz"

const NewTagPage: BlitzPage = () => {
  const router = useRouter()
  const [createTagMutation] = useMutation(createTag)

  return (
    <div className="flex-grow container mx-auto mt-24 sm:px-6">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-8">Create New Tag</h1>

        <TagForm
          submitText="Create Tag"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreateTag}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const tag = await createTagMutation(values)
              router.push(`/tags/${tag.id}`)
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

NewTagPage.authenticate = true
NewTagPage.getLayout = (page) => <Layout title={"Create New Tag"}>{page}</Layout>

export default NewTagPage
