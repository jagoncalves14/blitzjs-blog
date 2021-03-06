import {Mutator} from "final-form"
import React, {PropsWithoutRef, ReactNode} from "react"
import {Form as FinalForm, FormProps as FinalFormProps} from "react-final-form"
import * as z from "zod"
export {FORM_ERROR} from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  mutators: Mutator
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  mutators,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      mutators={{mutators}}
      onSubmit={onSubmit}
      render={({handleSubmit, submitting, submitError}) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{color: "red"}}>
              {submitError}
            </div>
          )}

          {submitText && (
            <button
              className="text-md font-semibold rounded bg-indigo-600 text-white transition-all py-2 px-6"
              type="submit"
              disabled={submitting}
            >
              {submitText}
            </button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default Form
