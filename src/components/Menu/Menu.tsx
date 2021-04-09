import React, {FC, createContext, useState} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './MenuItem';


type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps{
  defaultIndex?: string;  
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectIndex: string) => void;
  defalutOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string;
  onSelect?: (selectIndex: string) => void;
  mode?: MenuMode;
  defalutOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0'});

const Menu:FC<MenuProps> = (props) => {
  const {defaultIndex, className, mode, style, onSelect, children, defalutOpenSubMenus} = props;
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  }) 

  const [currentActive, setActive] = useState(defaultIndex);
  const hanleClick = (index: string) => {
    setActive(index);
    if(onSelect) onSelect(index);
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: hanleClick,
    mode,
    defalutOpenSubMenus
  }

  //对子组件进行限制 只能写MenuItem组件
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu'){
        return React.cloneElement(childElement,{index: index.toString()}) //将index插入节点中
      }else{
        console.error("Warning: Menu has a child which is not a MrnuItem component");
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu"> 
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defalutOpenSubMenus: []
}

export default Menu;