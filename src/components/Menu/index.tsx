import {FC} from 'react';

import Menu, {MenuProps} from './Menu';
import MenuItem, {MenuItemProps} from './MenuItem';
import subMenu, {SubMenuProps} from './subMenu';

export type IMenuComponent = FC<MenuProps> & {
  Item:FC<MenuItemProps>,
  SubMenu:FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = subMenu;

export default TransMenu;