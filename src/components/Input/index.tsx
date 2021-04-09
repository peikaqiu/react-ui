import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent} from 'react';
import classNames from 'classnames';

import { IconProp} from '@fortawesome/fontawesome-svg-core';
import Icon from "../Icon";

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> { //Omit忽略InputHTMLAttributes中的size属性
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  classname?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input:FC<InputProps> = (props) => {
  const {disabled, size, icon, prepend, append,placeholder, classname, style, children, ...restProps} = props
  const classes = classNames('input', classname, {
    'is-disabled': disabled,
    [`input-size-${size}`]: size,
    'input-group': prepend || append,
    'input-group-append': append,
    'input-group-prepend': prepend,
  })
  
  return (
    <div className={classes} style={style}>
      {prepend && <div className="wrapper-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon}/></div>}
      <input placeholder={placeholder} 
        className="input-inner"
        disabled={disabled} {...restProps} />
      {children}
      {append && <div className="wrapper-input-group-append">{append}</div>}
    </div>  
  )
}

export default Input;