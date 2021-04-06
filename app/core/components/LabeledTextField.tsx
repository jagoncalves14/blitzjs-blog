import React, {PropsWithoutRef} from "react"
import {useField} from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({name, label, outerProps, ...props}, ref) => {
    const {
      input,
      meta: {touched, error, submitError, submitting},
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label className="flex flex-col align-start text-gray-700 font-bold py-2">
          {label}
          <input className="w-full text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline mt-1 py-2 px-3" {...input} disabled={submitting} {...props} ref={ref} />
        </label>

        {touched && normalizedError && (
          <div className="text-xs" role="alert" style={{color: "red"}}>
            {normalizedError}
          </div>
        )}
      </div>
    )
  },
)

export default LabeledTextField
