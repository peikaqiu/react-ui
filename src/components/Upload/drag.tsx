import React, {FC, useState, DragEvent} from 'react';
import classNames from 'classnames';

export interface DragProps {
  onFile?: (file: FileList) => void;
}

const Drag:FC<DragProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);

  const classes = classNames('uploader-dragger', {
    'is-dragover' : dragOver
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    if(onFile) onFile(e.dataTransfer.files)
  }

  return (
    <div 
      className = {classes}
      onDragOver = {(e) => {handleDrag(e, true)}}
      onDragLeave = {(e) => {handleDrag(e, false)}}
      onDrop = {handleDrop}
    >
      {children}
    </div>
  )
}

export default Drag;