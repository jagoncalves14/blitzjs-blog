import {resolver} from "blitz"
import db, {Category, Tag} from "db"

export interface ICreatePostPayload {
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
  async ({authorId, data: {...data}}: ICreatePostPayload) => {
    const payload = {
      ...data,
      author: {connect: {id: authorId}},
      categories: {
        connectOrCreate: data.categories.map((cat: Category) => ({
          where: {
            id: cat.id,
          },
          create: {
            name: cat.name,
          },
        })),
      },
      tags: {
        connectOrCreate: data.tags.map((tag: Tag) => ({
          where: {
            id: tag.id,
          },
          create: {
            name: tag.name,
          },
        })),
      },
    }

    return await db.post.create({
      data: payload,
      include: {
        categories: true,
        tags: true,
      },
    })
  },
)
