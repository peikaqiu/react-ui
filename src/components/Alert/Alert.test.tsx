import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import Alert, {BaseAlertProps} from './index';

const defaultProps: BaseAlertProps = {
  title: "testAlert",
  customClose: "关闭"
}

const testSuccessAlertProp: BaseAlertProps = {
  showClose: true,
  customClose: "关闭",
  alertType: "success"
}

describe('test Alert component', () => {
  it('should render thie correct default alert', async () => {
    const wrapper = render(<Alert {...defaultProps}>Message</Alert>);
    const element = wrapper.queryByText('Message');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert-message');
    expect(element.parentNode).toHaveClass('alert alert-default');

    const titleElement = wrapper.queryByText('testAlert');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.parentNode).toHaveClass('alert-title');

    const iconElement = wrapper.queryByText('关闭');
    fireEvent.click(iconElement);
    await waitFor(() => {//上面点击后的结果
      expect(element).not.toBeInTheDocument();
    });
  })

  it('should render the correct component based on different props', async () => {
    const wrapper = render(<Alert {...testSuccessAlertProp}>Nice</Alert>);
    const element = wrapper.queryByText('Nice');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert-message');
    expect(element.parentNode).toHaveClass('alert alert-success');

    const iconElement = wrapper.queryByText('关闭');
    expect(iconElement).toBeInTheDocument();
    fireEvent.click(iconElement);
    await waitFor(() => {//上面点击后的结果
      expect(element).not.toBeInTheDocument();
    })
  })
})