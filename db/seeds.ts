import db from "."
const seed = async () => {
  const user = await db.user.create({
    data: {firstName: "Blitz", lastName: "Admin", email: "hey@" + new Date().getTime()},
  })
  console.log("Created user", user)
}
export default seed
