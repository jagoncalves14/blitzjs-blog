import resetPassword from "app/auth/mutations/resetPassword"
import {ResetPassword} from "app/auth/validations"
import {Form, FORM_ERROR} from "app/core/components/Form"
import {LabeledTextField} from "app/core/components/LabeledTextField"
import Layout from "app/core/layouts/Layout"
import {BlitzPage, Link, useMutation, useRouterQuery} from "blitz"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, {isSuccess}] = useMutation(resetPassword)

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href="/">homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{password: "", passwordConfirmation: "", token: query.token as string}}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error) {
              return error.name === "ResetPasswordError"
                ? {
                    [FORM_ERROR]: error.message,
                  }
                : {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                  }
            }
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </div>
  )
}

ResetPasswordPage.getLayout = (page) => (
  <Layout title="BlitzBlog - Reset Your Password">{page}</Layout>
)

export default ResetPasswordPage
