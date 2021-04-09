import React, { FC } from 'react';
import { UploadFile } from './index';
import Icon from '../Icon';
import Progress from "../Progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="upload-list">
      {
        fileList && fileList.map(i => {
          return (
            <li className="upload-list-item" key={i.uid}>
              <span className={`file-name file-name-${i.status}`}>
                <Icon icon="file-alt" />
                {i.name}
              </span>

              <span className="file-status">
                {i.status === "uploading" &&
                  <Icon icon="spinner" spin theme="primary" />}
                {i.status === "success" &&
                  <Icon icon="check-circle" theme="success" />}
                {i.status === "error" &&
                  <Icon icon="times-circle" theme="danger" />}
              </span>

              <span className="file-actions">
                <Icon icon="times" onClick={() => onRemove(i)} />
              </span>

              {i.status === 'uploading' &&
                <Progress percent={i.per || 0} />
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList;