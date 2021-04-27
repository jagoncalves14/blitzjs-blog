import "suneditor/dist/css/suneditor.min.css"

import {usePaginatedQuery} from "@blitzjs/core"
import getCategories from "app/categories/queries/getCategories"
import Dropzone from "app/core/components/Dropzone"
import {Form, FormProps} from "app/core/components/Form"
import {LabeledTextField} from "app/core/components/LabeledTextField"
import getTags from "app/tags/queries/getTags"
import {Field} from "react-final-form"
import CreatableSelect from "react-select/creatable"
import SunEditor from "suneditor-react"
export {FORM_ERROR} from "app/core/components/Form"

const uploadFile = async (files: any) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/deagwncqs/upload"
  const cloudPreset = "kk9xemf8"

  const formData = new FormData()
  formData.append("file", files[0])
  formData.append("upload_preset", cloudPreset)

  const response = await fetch(cloudUrl, {
    method: "POST",
    body: formData,
  })
  return response.json()
}

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{categories}] = usePaginatedQuery(getCategories, {orderBy: {id: "asc"}})
  const [{tags}] = usePaginatedQuery(getTags, {orderBy: {id: "asc"}})

  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Add the title of the post" />

      <div>
        <label
          className="flex flex-col align-start text-gray-700 font-bold py-2"
          htmlFor="Thumbnail Image"
        >
          Thumbnail Image
        </label>

        <Field
          name="thumbnail"
          render={({input, meta}) => {
            return (
              <>
                {props.initialValues?.thumbnail && input.value ? (
                  <>
                    <img src={props.initialValues?.thumbnail} alt="Thumbnail" />
                    <button type="button" onClick={() => input.onChange(null)}>
                      Remove thumbnail
                    </button>
                  </>
                ) : (
                  <Dropzone
                    onChange={async (file: any) => {
                      const response = await uploadFile(file)
                      input.onChange(response.secure_url)
                    }}
                  />
                )}
                <input {...input} type="hidden" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </>
            )
          }}
        />
      </div>

      <Field
        name="content"
        render={({input, meta}) => {
          const {
            align,
            font,
            fontColor,
            fontSize,
            formatBlock,
            horizontalRule,
            image,
            link,
            list,
            paragraphStyle,
            template,
            textStyle,
          } = require("suneditor/src/plugins")
          return (
            <>
              <SunEditor
                {...input}
                onFocus={undefined}
                onBlur={undefined}
                defaultValue={props.initialValues?.content}
                setOptions={{
                  showPathLabel: false,
                  minHeight: "50vh",
                  maxHeight: "100vh",
                  placeholder: "Enter your content here",
                  plugins: [
                    align,
                    font,
                    fontColor,
                    fontSize,
                    formatBlock,
                    horizontalRule,
                    list,
                    paragraphStyle,
                    template,
                    textStyle,
                    image,
                    link,
                  ],
                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock"],
                    ["paragraphStyle"],
                    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                    "/", // Line break
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list"],
                    ["link", "image"],
                  ],
                  formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                }}
              />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </>
          )
        }}
      />

      <Field
        name="categories"
        render={({input, meta}) => {
          return (
            <>
              <label
                className="flex flex-col align-start text-gray-700 font-bold py-2"
                htmlFor="categories"
              >
                Categories
              </label>
              <CreatableSelect
                className="mt-0 z-10"
                {...input}
                isMulti
                isClearable
                value={input.value}
                options={categories}
                getOptionLabel={(option) => option.name || option}
                getOptionValue={(option) => option.id || option}
                getNewOptionData={(inputValue, optionLabel) => ({
                  id: inputValue === optionLabel ? 0 : inputValue,
                  name: optionLabel,
                })}
              />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </>
          )
        }}
      />

      <Field
        name="tags"
        render={({input, meta}) => {
          return (
            <>
              <label
                className="flex flex-col align-start text-gray-700 font-bold py-2"
                htmlFor="tags"
              >
                Tags
              </label>
              <CreatableSelect
                className="mt-0 z-10"
                {...input}
                isMulti
                isClearable
                value={input.value}
                options={tags}
                getOptionLabel={(option) => option.name || option}
                getOptionValue={(option) => option.id || option}
                getNewOptionData={(inputValue, optionLabel) => ({
                  id: inputValue === optionLabel ? 0 : inputValue,
                  name: optionLabel,
                })}
              />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </>
          )
        }}
      />

      <Field
        name="published"
        type="checkbox"
        render={({input, meta}) => (
          <div className="block mt-8">
            <label className="inline-flex items-center" htmlFor="published">
              <input
                className="form-checkbox border border-gray-600 outline-none focus:border-gray-600 rounded h-5 w-5 text-gray-600"
                {...input}
                id="published"
                type="checkbox"
                name="published"
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
