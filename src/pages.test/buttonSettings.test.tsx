import { render, screen } from '@testing-library/react';

import ButtonSettings from '../components/buttonSettings';

describe('ButtonSettings page', () => {
  it('should render heading, textfield', () => {
    render(<ButtonSettings />);
    const heading = screen.getByRole('heading', { name: 'Button Settings' });
    expect(heading).toBeVisible();
  });
});
