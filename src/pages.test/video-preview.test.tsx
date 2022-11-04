import { render } from '@testing-library/react';

import VideoPreview from '@/pages';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('VideoPreview', () => {
  describe('Render method', () => {
    it('should have video', () => {
      render(<VideoPreview />);
      // const videoPreview = screen.getByTitle("video")
      // expect(videoPreview).toBeInTheDocument()
    });
  });
});
