import {resolver} from "blitz"
import db, {Category} from "db"

export interface IUpdatePostPayload {
  postId: number
  authorId: number
  data: {
    title: string
    content: string
    published: boolean
    categories: Category[]
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
    }

    return await db.post.update({
      where: {
        id: postId,
      },
      data: payload,
      include: {
        categories: true,
      },
    })
  },
)
