import React, { ChangeEvent, FC, useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';

import Drag from './drag';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  per?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string,
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProcess?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onChange?: (file: File) => void;
  defaultList?: UploadFile[];
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;

  accept?: string;
  multiple?: boolean;

  drag?: boolean;
}

const Upload: FC<UploadProps> = (props) => {
  const { action, beforeUpload, onProcess, onSuccess, onError, onChange, defaultList, onRemove, headers, name, data, withCredentials, accept, multiple, drag, children } = props;
  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>(defaultList || []);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = "";
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processFile => {
            post(processFile)
          })
        } else if (result) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: 'ready',
      name: file.name,
      size: file.size,
      per: 0,
      raw: file
    }

    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    });//一开始设置上传对象信息

    const formData = new FormData();
    formData.append(name || 'file', file);

    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      })
    }

    axios.post(action, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data"
      },
      withCredentials,
      onUploadProgress: (e) => {
        let per = Math.round((e.loaded * 100) / e.total) || 0;
        if (per < 100) {
          //百分比过程需要根性对象信息
          updateFileList(_file, { per: per, status: 'uploading' })

          if (onProcess) onProcess(per, file);
        }
      }
    }).then(res => {
      console.log(res);
      updateFileList(_file, { status: 'success', response: res.data });
      if (onSuccess) onSuccess(res.data, file);
      if (onChange) onChange(file);
    }).catch(error => {
      updateFileList(_file, { status: 'error', error });
      if (onError) onError(error, file);
      if (onChange) onChange(file);
    })
  }

  //更新上传对象信息
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  //删除文件
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(i => i.uid !== file.uid);
    })
    if (onRemove) onRemove(file);
  }



  // console.log(fileList);

  return (
    <div>
      <div onClick={handleClick}>
        {
          drag? 
          <Drag onFile = {(files) => {uploadFiles(files)}}>{children}</Drag> : {children}
        }
      </div>
      {/* <Button btnType="primary" onClick={handleClick}>点击上传</Button> */}
      <input type="file" style={{ display: 'none' }} ref={fileInput} onChange={handleFileChange} accept={accept} multiple={multiple} />

      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;