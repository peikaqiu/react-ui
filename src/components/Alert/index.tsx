import React, { FC, useState } from 'react';
import classnames from 'classnames';

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

export interface BaseAlertProps {
  classname?: string;
  alertType?: string;
  showClose?: boolean;
  customClose?: string;
  onClose?: () => void;
  title?: string;
}

const Alert: FC<BaseAlertProps> = (props) => {
  const [show, setShow] = useState(true);
  const { classname, alertType, showClose, onClose,customClose,  title, children } = props;

  const classes = classnames('alert', classname, {
    [`alert-${alertType}`]: alertType,
  });

  const closeFunc = () => {
    setShow(!show)
    if (onClose) onClose();
  }

  return (
    <>
      {
        show ?
          <div className={classes}>
            <div className="alert-title">
              <span>{title}</span>
              {showClose ? <span onClick={closeFunc}>{customClose}</span> : null}
            </div>
            {
              children ? <div className="alert-message">{children}</div> : null
            }
          </div> : null
      }
    </>
  )
}

Alert.defaultProps = {
  title: '默认标题',
  alertType: 'default',
  showClose: true,
  customClose: '关闭'
}

export default Alert;