import { fireEvent, render, screen } from '@testing-library/react';

import ResetPassword from '../pages/reset-password';

describe('Reset password page', () => {
  it('should have button tag', () => {
    render(<ResetPassword />);
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeVisible();
  });

  it('render password input', () => {
    render(<ResetPassword />);
    const inputPs = screen.getByTestId('password');
    expect(inputPs).toBeInTheDocument();
  });

  it('should able to type in input correctly', () => {
    render(<ResetPassword />);
    const inputPs = screen.getByTestId('password-test');
    fireEvent.change(inputPs, { target: { value: 'new password' } });
    expect((inputPs as HTMLInputElement).value).toBe('new password');
    // expect(inputPs).toHaveAttribute('password');
    // screen.debug();
  });

  it('input should be password type', () => {
    render(<ResetPassword />);
    const inputPs = screen.getByTestId('password-test');
    fireEvent.change(inputPs, { target: { value: 'new content' } });
    expect(inputPs).toHaveAttribute('type', 'password');
  });

  // it('should have empty input when sumbit button is clicked', () => {
  //   render(<ResetPassword />);
  //   const inputElement = screen.getByTestId('password-test');
  //   const buttonElement = screen.getByRole('button', { name: /submit/i});
  //   fireEvent.change(inputElement, { target: { value: 'new password' } });
  //   fireEvent.click(buttonElement);
  //   expect(inputElement.value).toBe('');
  // });
});
