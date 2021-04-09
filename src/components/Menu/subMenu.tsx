import React, {FC, useContext, useState} from 'react';
import classNames from 'classnames';
import {MenuContext} from './Menu';
import {MenuItemProps} from './MenuItem';


import Icon from '../Icon'
import Transition from '../Transition';

export interface SubMenuProps {
  index?: string;
  classname?: string;
  title?: string
}

const SubMenu:FC<SubMenuProps> = ({index, classname, title, children}) => {
  const context = useContext(MenuContext);

  const openSubMenus = context.defalutOpenSubMenus as Array<string>;
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;

  const [show, setShow] = useState(isOpend);
  const classes = classNames('menu-item submenu-item', classname, {
    'is-active': context.index === index,
    'is-opened': show,
    'is-vertical': context.mode === 'vertical'
  })

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem'){
        return React.cloneElement(childElement, {index: `${index}-${i}`})
      }else{
        console.error("Warning: Menu has a child which is not a MrnuItem component");
      }
    })

    const classes = classNames('submenu', {
      'menu-opened': show
    })

    return (
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul className={classes}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  const handleClick = (e: React.MouseEvent) => {
    if(context.onSelect && (typeof index == 'string')){
      e.preventDefault();
      context.onSelect(index);
      setShow(!show);
    }
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setShow(toggle);
    },300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  } : {}

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title} 
        <Icon icon="angle-down" theme="danger" className="arrow-icon"/>
      </div>

    
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu";

export default SubMenu;
