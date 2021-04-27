import {LoginForm} from "app/auth/components/LoginForm"
import Layout from "app/core/layouts/Layout"
import {BlitzPage, useRouter} from "blitz"
import React from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="flex-grow container mx-auto mt-12 pb-24">
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="BlitzBlog - Log In">{page}</Layout>

export default LoginPage
