import { render, screen } from '@testing-library/react';

import ResetPassword from '../pages/reset-password';

it('should have button tag', () => {
  render(<ResetPassword />);
  const submitButton = screen.getByRole('button');
  expect(submitButton).toBeVisible();
});

it('render password input', () => {
  render(<ResetPassword />);
  const inputPs = screen.getByTestId('password');
  expect(inputPs).toBeInTheDocument();
  // expect(inputPs).toHaveAttribute('password');
});
