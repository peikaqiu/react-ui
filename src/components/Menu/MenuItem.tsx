import React, {FC, useContext} from 'react';
import classNames from 'classnames';

import {MenuContext} from './Menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  classNmae?: string;
  style?: React.CSSProperties
}

const MenuItem:FC<MenuItemProps> = (props) => {
  const {index, disabled, classNmae, style, children} = props;
  const context = useContext(MenuContext);

  const classes = classNames('menu-item', classNmae, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index == 'string')){
      context.onSelect(index);
    }
  }


  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

//React内置属性 判断类型
MenuItem.displayName = 'MenuItem';

export default MenuItem;