import login from "app/auth/mutations/login"
import {Login} from "app/auth/validations"
import {Form, FORM_ERROR} from "app/core/components/Form"
import {LabeledTextField} from "app/core/components/LabeledTextField"
import {AuthenticationError, Link, useMutation} from "blitz"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome aboard</h1>
        <Form
          submitText="Login"
          schema={Login}
          initialValues={{email: "", password: ""}}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return {[FORM_ERROR]: "Sorry, those credentials are invalid"}
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        </Form>

        <hr className="mt-8"/>

        <div className="block mt-8 text-center">
          <Link href="/forgot-password">
            <a className="text-indigo-600">Forgot your password?</a>
          </Link>
        </div>

        <div className="block mt-4 text-center bg-indigo-100 rounded px-4 py-2">
          <p className="text-center text-gray-800">Not a member yet? <Link href="/signup"><a className="text-indigo-600">Sign up</a></Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
