import Layout from "app/core/layouts/Layout"
import deleteTag from "app/tags/mutations/deleteTag"
import getTag from "app/tags/queries/getTag"
import {BlitzPage, Head, Link, useMutation, useParam, useQuery, useRouter} from "blitz"
import {Suspense} from "react"

export const Tag = () => {
  const router = useRouter()
  const tagId = useParam("tagId", "number")
  const [deleteTagMutation] = useMutation(deleteTag)
  const [tag] = useQuery(getTag, {id: tagId})

  return (
    <>
      <Head>
        <title>Tag {tag.id}</title>
      </Head>

      <div className="flex-grow container mx-auto">
        <h1>Tag {tag.id}</h1>
        <pre>{JSON.stringify(tag, null, 2)}</pre>

        <Link href={`/tags/${tag.id}/edit`}>
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Edit
          </a>
        </Link>

        <button
          className="text-md leading-none font-semibold rounded bg-red-600 text-white transition-all py-2 px-6 ml-4"
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTagMutation({id: tag.id})
              router.push("/tags")
            }
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTagPage: BlitzPage = () => {
  return (
    <div className="flex-grow container mx-auto sm:px-6">
      <div className="w-full text-right">
        <Link href="/tags">
          <a className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6">
            Tags
          </a>
        </Link>
      </div>

      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <Tag />
        </Suspense>
      </div>
    </div>
  )
}

ShowTagPage.authenticate = true
ShowTagPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTagPage
