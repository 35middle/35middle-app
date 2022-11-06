import { render, screen } from '@testing-library/react';

import Landing from '@/pages/landing';

describe('Landing page', () => {
  it('Render login button', () => {
    render(<Landing />);

    const loginButton = screen.getByTestId('login');
    const registerButton = screen.getByTestId('register');
    expect(loginButton).toBeVisible();
    expect(registerButton).toBeVisible();
  });
});
