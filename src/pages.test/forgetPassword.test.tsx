import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import ForgetPassword from '../pages/forgetPassword';

describe('ForgetPassword', () => {
  it('renders a heading', () => {
    render(<ForgetPassword />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveClass('btn-outline');

    expect(
      screen.getByText(`Magic Link to reset password`)
    ).toBeInTheDocument();
  });
});
