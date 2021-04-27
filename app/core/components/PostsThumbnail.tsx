import {Category, Post, Tag} from "db"
import Link from "next/link"

type PostsThumbnailProps = {
  post: Post & {categories: Category[]} & {tags: Tag[]}
}

export const PostsThumbnail = ({post}: PostsThumbnailProps) => {
  return (
    <div>
      {post.id}
      <Link href={`/posts/${post.id}`}>
        <a className="black mt-1">{post.title}</a>
      </Link>
    </div>
  )
}

export default PostsThumbnail
