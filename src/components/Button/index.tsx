import React, { FC } from 'react';
import classnames from 'classnames';

export enum ButtonSize {
  Larget = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  classname?: string;
  disabled?: boolean;
  size?: string;
  btnType?: string;
  href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;//button原生属性
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;//a标签原生属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;//存在问题有些属性Buttonb必传 a不必传 反之 使用Partil设置属性为可选的

const Button: FC<ButtonProps> = (props) => {
  const { classname, btnType, disabled, size, href, children, ...restProps } = props;

  const classes = classnames('btn', classname, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled = {disabled} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;
