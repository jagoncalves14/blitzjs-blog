import {resolver} from "blitz"
import db, {Category} from "db"

export interface ICreatePostPayload {
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
  async ({authorId, data: {...data}}: ICreatePostPayload) => {
    const payload = {
      ...data,
      author: {connect: {id: authorId}},
      categories: {
        connectOrCreate: data.categories.map((cat: Category) => ({
          where: {id: cat.id},
          create: {
            name: cat.name,
          },
        })),
      },
    }

    // @ts-ignore
    return await db.post.create({
      data: payload,
    })
  },
)
