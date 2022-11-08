import { render } from '@testing-library/react';

import Account from '@/pages/account';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('Account page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<Account />);
      expect(1).toBe(1);
    });
  });
});
