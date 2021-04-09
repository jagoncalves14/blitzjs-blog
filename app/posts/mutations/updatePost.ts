import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const UpdatePost = z
  .object({
    id: z.number().int(),
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
    categories: z.array(
      z.object({
        name: z.string(),
        id: z.number().int(),
      }),
    ),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize(),
  async ({id, ...data}) => {
    delete data.authorId

    const payload = {
      ...data,
      categories: {
        set: [],
        connectOrCreate: data.categories.map((cat) => ({
          where: {id: cat.id},
          create: {
            name: cat.name,
          },
        })),
      },
    }

    return await db.post.update({where: {id}, data: payload})
  },
)
