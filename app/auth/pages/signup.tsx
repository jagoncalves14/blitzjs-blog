import {SignupForm} from "app/auth/components/SignupForm"
import Layout from "app/core/layouts/Layout"
import {BlitzPage, useRouter} from "blitz"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="flex-grow container mx-auto mt-12 pb-24">
      <SignupForm onSuccess={() => router.push("/")} />
    </div>
  )
}

SignupPage.getLayout = (page) => <Layout title="BlitzBlog - Sign Up">{page}</Layout>

export default SignupPage
