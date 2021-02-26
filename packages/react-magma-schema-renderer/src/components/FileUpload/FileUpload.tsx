import { AnyObject } from "@data-driven-forms/react-form-renderer";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from '@emotion/styled';
import { Previews } from './Previews';
import { IconButton, ProgressBar } from "react-magma-dom";
import { CloudUploadIcon } from "react-magma-icons";

const getColor = (props:any) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

export const FileUpload = (props: any) => {
  const [files, setFiles] = useState<any[]>([]);
  const [length, setLength] = useState(0);

  const onDrop = React.useCallback((acceptedFiles, setFiles) => {
    setFiles([])
    setLength(acceptedFiles.length)
    acceptedFiles.forEach((file:any) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setFiles((files:any) => [...files, Object.assign(file, {encoded: reader.result})])
      }
      setTimeout(() => {
        reader.readAsDataURL(file)
      }, Math.floor(Math.random() * 10000))
    })
  }, [])
  
  const {
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    multiple: true,
    noDrag: false,
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, setFiles),
  });

  const removeFile = (file:any) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  useEffect(
    () => {
      props.onChange(files)
      return () => {
        // Make sure to revoke the data uris to avoid memory leaks
        // props.onChange(files)
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }
    },
    [files]
  );

  return (
    <>
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>        
        <input {...getInputProps()} />
        <p>Drag some files here, or click to select files</p>
        <IconButton icon={<CloudUploadIcon />} onClick={open}>Upload files</IconButton>
      </Container>
      {files.length !== 0 && <ProgressBar isAnimated={files.length!==length} percentage={(files.length / length) * 100} />}
      <Previews onRemoveFile={removeFile} files={files} />
    </>
  );
}
