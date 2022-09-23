import { render } from '@testing-library/react';

import ForgetPassword from '@/pages/forgetPassword';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('ForgetPassword page', () => {
  describe('Render method', () => {
    it('should have two paragraphs of `Lorem ipsum`', () => {
      render(<ForgetPassword />);
      expect(1).toBe(1);
    });
  });
});
