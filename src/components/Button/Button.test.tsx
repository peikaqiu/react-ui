import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Button, {ButtonProps} from './index';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  classname: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

// test('our first react test case', () => {
//   const wrapper = render(<Button>abc</Button>);
//   const element = wrapper.queryByText('abc');
//   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument();
// })

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>abc</Button>)
    const element = wrapper.getByText('abc') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on differernt props', () => {
    const wrapper = render(<Button {...testProps}>abc</Button>)
    const element = wrapper.getByText('abc')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href="http://baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disable button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>abc</Button>)
    const element = wrapper.getByText('abc') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})














