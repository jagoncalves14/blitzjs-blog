import {resolver} from "blitz"
import db, {Category, Tag} from "db"

export interface IUpdatePostPayload {
  postId: number
  authorId: number
  data: {
    title: string
    thumbnail: string
    content: string
    published: boolean
    categories: Category[]
    tags: Tag[]
  }
}

export default resolver.pipe(
  resolver.authorize(),
  async ({postId, authorId, data: {...data}}: IUpdatePostPayload) => {
    const payload = {
      ...data,
      author: {
        connect: {
          id: authorId,
        },
      },
      categories: {
        set: [],
        connectOrCreate: data.categories.map((cat) => ({
          where: {
            id: cat.id,
          },
          create: {
            name: cat.name,
          },
        })),
      },
      tags: {
        set: [],
        connectOrCreate: data.tags.map((tag) => ({
          where: {
            id: tag.id,
          },
          create: {
            name: tag.name,
          },
        })),
      },
    }

    return await db.post.update({
      where: {
        id: postId,
      },
      data: payload,
      include: {
        categories: true,
        tags: true,
      },
    })
  },
)
