import { BlitzPage, Head } from "blitz"
import Layout from "app/components/Layout"
import BasicMeta from "app/components/meta/BasicMeta"
import OpenGraphMeta from "app/components/meta/OpenGraphMeta"
import TwitterCardMeta from "app/components/meta/TwitterCardMeta"
import PostsList from "app/components/PostList"
import { Suspense } from "react"

const ShowIndexPage: BlitzPage = () => {
  const url = "/posts"
  const title = "Hello World"

  return (
    <Layout>
      <Head>
        <BasicMeta url={url} title={title} />
        <OpenGraphMeta url={url} title={title} />
        <TwitterCardMeta url={url} title={title} />
      </Head>

      <section>
        <div className="container">
          <h1>BlitzJS Blog</h1>
        </div>
      </section>

      <section>
        <div className="container">
          <h1>Recent Posts</h1>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <PostsList />
        </Suspense>
      </section>

      <style jsx>
        {`
          section {
            display: flex;
            flex-flow: column wrap;
            min-height: 500px;
            border-bottom: 1px solid black;
            padding: 30px 0;
          }
        `}
      </style>
    </Layout>
  )
}

ShowIndexPage.authenticate = false
ShowIndexPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowIndexPage
