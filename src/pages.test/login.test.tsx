import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Login, { validateInput } from '@/pages/login';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Login page', () => {
  it('Validation function should pass on correct input', () => {
    let text: string;
    // eslint-disable-next-line prefer-const
    text = 'test@test.com';
    render(<Login />);
    expect(validateInput(text)).toBe(true);
  });

  it('Validate function should fail on incorrect input', () => {
    let text: string;
    // eslint-disable-next-line prefer-const
    text = 'test';
    render(<Login />);
    expect(validateInput(text)).toBe(false);
  });

  it('login form should be in the document', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(<Login />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelElement = component.getByLabelText('Email address');
    expect(labelElement).toBeInTheDocument();
  });

  it('email input should accept text', () => {
    const { getByLabelText } = render(<Login />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const emailInputElement = getByLabelText('Email address');
    // @ts-ignore
    expect(emailInputElement.value).toMatch('');
    fireEvent.change(emailInputElement, { target: { value: 'testing' } });
    // @ts-ignore
    expect(emailInputElement.value).toMatch('testing');
  });

  // it('should be able to submit the request', () => {
  //   const mockFn = jest.fn();
  //   // @ts-ignore
  //   const { getByRole } = render(<login POST={mockFn} />);
  //   // eslint-disable-next-line testing-library/prefer-screen-queries
  //   const buttonElement = getByRole('button');
  //   fireEvent.submit(buttonElement);
  //   expect(mockFn).toHaveBeenCalledTimes(1);
  // });
});
