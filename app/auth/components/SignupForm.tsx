import signup from "app/auth/mutations/signup"
import {Signup} from "app/auth/validations"
import {Form, FORM_ERROR} from "app/core/components/Form"
import {LabeledTextField} from "app/core/components/LabeledTextField"
import {useMutation} from "blitz"
import React from "react"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-600">Fill the form below to create your own account</p>
        </div>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{email: "", password: ""}}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return {email: "This email is already being used"}
              } else {
                return {[FORM_ERROR]: error.toString()}
              }
            }
          }}
        >
          <div className="grid gap-4 grid-cols-2">
          <LabeledTextField name="firstName" label="First Name" placeholder="John" />
          <LabeledTextField name="lastName" label="Last Name" placeholder="Doe" />
          </div>
          <LabeledTextField name="email" label="Email" placeholder="johndoe@email.com" />
          <LabeledTextField name="password" type="password" label="Password" placeholder="10 characters long" />
        </Form>
    </div>
    </div>
  )
}

export default SignupForm
