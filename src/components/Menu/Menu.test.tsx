import React from 'react';
import {render, RenderResult, fireEvent, cleanup, waitFor} from '@testing-library/react';

import Menu, {MenuProps} from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './subMenu';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);



const testProps: MenuProps = {
  defaultIndex:'0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex:'0',
  onSelect: jest.fn(),
  className: 'test',
  mode: 'vertical',
  defalutOpenSubMenus:['4']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>3</MenuItem>
      <SubMenu title="dropDown">
        <MenuItem>drop</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          open
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.setAttribute('type','text/css');
  style.innerHTML = cssFile
  return style
}


let wrapper: RenderResult,wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test menu and menuItem component', () => {
  beforeEach(() => {//在下面每个case之前都会跑
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());//插入css
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5); //只获取一级的li
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })

  // it('click item should change active and call the right callback', () => {
  //   const thirdItem = wrapper.getByText('3');

  //   fireEvent.click(thirdItem);
  //   expect(thirdItem).toHaveClass('is-active');
  //   expect(activeElement).not.toHaveClass('is-active');
  //   expect(testProps.onSelect).toHaveBeenCalledWith('2');

  //   fireEvent.click(disabledElement);
  //   expect(disabledElement).not.toHaveClass('is-active');
  //   expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  // })

  // it('should show dropdown items when hover on subMeun', async() => {
  //   expect(wrapper.queryByText('drop')).not.toBeVisible();

  //   const dropDownElement = wrapper.getByText('dropDown');
  //   fireEvent.mouseEnter(dropDownElement);
  //   await waitFor(() => {
  //     expect(wrapper.queryByText('drop')).toBeVisible();
  //   });

  //   fireEvent.click(wrapper.getByText('drop'))
  //   expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

  //   fireEvent.mouseLeave(dropDownElement);
  //   await waitFor(() => {
  //     expect(wrapper.queryByText('drop')).not.toBeVisible();
  //   });
  // })
})

// describe('test Meni and MenuItem component in vertical mode', () => {
//   beforeEach(() => {
//     wrapper2 = render(generateMenu(testVerProps));
//     wrapper2.container.append(createStyleFile());//插入css
//   })

//   it('should render vertical mode when mode is set to vertical', () => {
//     cleanup();//把之前的变量清干净
//     const wrapper2 = render(generateMenu(testVerProps));
//     const menuElement = wrapper2.getByTestId('test-menu');
//     expect(menuElement).toHaveClass('menu-vertical');
//   })

//   it('should show dropdown items when click on subMenu for vertical mode', () => {
//     const dropDownItem = wrapper2.getByText('drop');
//     expect(dropDownItem).not.toBeVisible();

//     fireEvent.click(wrapper2.getByText('dropDown'))
//     expect(dropDownItem).toBeVisible();
//   })

//   it('should show subMenu when defaultOpenSubMenus contains SubMenu index', () => {
//     expect(wrapper2.getByText('open')).toBeVisible();
//   })
// })