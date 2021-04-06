import {resolver} from "blitz"
import db, { Category } from "db"
import * as z from "zod"

const UpdatePost = z
  .object({
    id: z.number().int(),
    title: z.string(),
    published: z.boolean(),
    categories: z.array(z.object({
      name: z.string(),
      id: z.number().int(),
    }))
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize(),
  async ({id, ...data}) => {
    let connectOrCreate: { create: { name: string; }; where: { id: number; } }[] = []

    data.categories.forEach((category: Category) => {
      connectOrCreate.push({
        where: {
          id: !isNaN(category.id) ? category.id : 0
        },
        create: {name: category.name},
      })
    })

    const payload = {
      ...data.data,
      categories: {
        set:[],
        connectOrCreate
      }
    }

    const post = await db.post.update({where: {id}, data: payload})
    return post
  },
)
