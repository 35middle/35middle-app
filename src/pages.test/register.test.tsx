import { render, screen } from '@testing-library/react';

import Register from '../pages/register';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Register page', () => {
  it('should have button tag', () => {
    render(<Register />);
    // eslint-disable-next-line testing-library/await-async-query
    const registerButton = screen.getByRole('button');
    expect(registerButton).toBeVisible();
  });
});
