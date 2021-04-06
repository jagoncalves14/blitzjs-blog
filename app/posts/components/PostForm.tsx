import { usePaginatedQuery } from "@blitzjs/core";
import getCategories from "app/categories/queries/getCategories"
import { Form, FormProps} from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Field } from 'react-final-form'
import CreatableSelect from 'react-select/creatable';
import * as z from "zod"
export {FORM_ERROR} from "app/core/components/Form"

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{categories}] = usePaginatedQuery(getCategories, {orderBy: {id: "asc"}})

  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Add the title of the post" />
      <Field
        name="categories"
        render={({ input, meta }) => {
          window.console.log(input)
          return(
          <>
            <label className="flex flex-col align-start text-gray-700 font-bold py-2">Categories</label>
            <CreatableSelect
              className="mt-0"
              {...input}
              isMulti
              isClearable
              value={input.value}
              options={categories}
              getOptionLabel={(option)=>option.name || option}
              getOptionValue={(option)=>option.id || option}
              getNewOptionData={(inputValue, optionLabel) =>( { id: inputValue, name: optionLabel })}
            />
            {meta.touched && meta.error && <span>{meta.error}</span>}
        </>
        )}}
      />

      <Field
        name="published"
        type="checkbox"
        render={({ input, meta }) => (
        <div className="block">
          <label className="inline-flex items-center" htmlFor="published">
            <input
              {...input}
              type="checkbox"
              id="published"
              name="published"
              className="form-checkbox border border-gray-600 outline-none focus:border-gray-600 rounded h-5 w-5 text-gray-600"
              checked={input.checked}
            />
            <span className="ml-2">Publish</span>
            {meta.touched && meta.error && <span>{meta.error}</span>}
          </label>
        </div>
      )}
      />
    </Form>
  )
}
