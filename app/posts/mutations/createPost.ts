import {resolver} from "blitz"
import db from "db"
import * as z from "zod"

const CreatePost = z
  .object({
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
  resolver.zod(CreatePost),
  resolver.authorize(),
  async ({id, ...data}) => {
    const payload = {...data}

    // @ts-ignore
    delete payload.categories
    const createResponse = await db.post.create({
      data: payload,
    })

    if (data.categories.length > 0) {
      const categoriesPayload = {
        categories: {
          connectOrCreate: data.categories.map((cat) => ({
            where: {id: cat.id},
            create: {
              name: cat.name,
            },
          })),
        },
      }

      return await db.post.update({where: {id: createResponse.id}, data: categoriesPayload})
    }
    return createResponse
  },
)
