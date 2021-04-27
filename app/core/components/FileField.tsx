import type {InputHTMLAttributes} from "react"
import {Field} from "react-final-form"

import Dropzone from "./Dropzone"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const uploadFile = async (file: any) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/deagwncqs/upload"
  const cloudPreset = "kk9xemf8"

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", cloudPreset)

  const response = await fetch(cloudUrl, {
    method: "POST",
    body: formData,
  })
  return response.json()
}

export const FileField = ({name, ...props}: Props) => (
  <Field<FileList> name={name}>
    {({input: {value, onChange, ...input}}) => (
      <Dropzone
        {...input}
        onChange={async (files) => {
          if (files.length > 0) {
            const fileURL = await uploadFile(files[0])
            value = fileURL.secure_url
          }
        }}
      />
    )}
  </Field>
)
