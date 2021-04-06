import Layout from "app/core/layouts/Layout"
import {FORM_ERROR, TagForm} from "app/tags/components/TagForm"
import updateTag from "app/tags/mutations/updateTag"
import getTag from "app/tags/queries/getTag"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter} from "blitz"
import {Suspense} from "react"

export const EditTag = () => {
  const router = useRouter()
  const tagId = useParam("tagId", "number")
  const [tag, {setQueryData}] = useQuery(getTag, {id: tagId})
  const [updateTagMutation] = useMutation(updateTag)

  return (
    <>
      <Head>
        <title>Edit Tag {tag.id}</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <h1>Edit Tag {tag.id}</h1>
        <pre>{JSON.stringify(tag)}</pre>

        <TagForm
          submitText="Update Tag"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTag}
          initialValues={tag}
          onSubmit={async (values) => {
            try {
              const updated = await updateTagMutation({
                id: tag.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/tags/${updated.id}`)
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

const EditTagPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTag />
      </Suspense>

      <p>
        <Link href="/tags">
          <a>Tags</a>
        </Link>
      </p>
    </div>
  )
}

EditTagPage.authenticate = true
EditTagPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTagPage
