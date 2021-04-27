import React, {useEffect, useState} from "react"
import {useDropzone} from "react-dropzone"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  width: 100,
  height: 100,
  boxSizing: "border-box",
}

const thumbButton = {
  display: "inline-block",
  whiteSpace: "nowrap",
  marginLeft: 20,
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  flex: "1 0 100%",
}

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
}

function Dropzone(props) {
  const [files, setFiles] = useState([])
  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/*",
    multiple: false,
    noDrag: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )
      setFiles(files)
      if (props.onChange) {
        props.onChange(files)
      }
    },
  })

  const removeFile = (file) => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
      <button style={thumbButton} onClick={removeFile(file)}>
        Remove File
      </button>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  return (
    <div className="d-inline-block mt-4">
      <div {...getRootProps({className: "btn-dropzone"})}>
        <input {...getInputProps()} />
        <span>Click here to upload image</span>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  )
}

export default Dropzone
