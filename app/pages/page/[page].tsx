import { GetStaticPaths, GetStaticProps } from "next"
import Layout from "app/components/Layout"
import BasicMeta from "app/components/meta/BasicMeta"
import OpenGraphMeta from "app/components/meta/OpenGraphMeta"
import TwitterCardMeta from "app/components/meta/TwitterCardMeta"
import PostList from "app/components/PostList"
import config from "app/lib/config"
import { countPosts, listPostContent, PostContent } from "app/lib/posts"
import { listTags, TagContent } from "app/lib/tags"

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  page: number
  pagination: {
    current: number
    pages: number
  }
}
export default function Page({ posts, tags, pagination, page }: Props) {
  const url = `/posts/page/${page}`
  const title = "All posts"
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string)
  const posts = listPostContent(page, config.posts_per_page)
  const tags = listTags()
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  }
  return {
    props: {
      page,
      posts,
      tags,
      pagination,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page)
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }))
  return {
    paths: paths,
    fallback: false,
  }
}
