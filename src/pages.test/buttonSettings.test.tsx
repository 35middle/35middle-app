<<<<<<< HEAD
import { render, screen } from '@testing-library/react';

import ButtonSettings from '../components/buttonSettings';

describe('ButtonSettings page', () => {
  it('should render heading, textfield', () => {
    render(<ButtonSettings />);
    const heading = screen.getByRole('heading', { name: 'Button Settings' });
    expect(heading).toBeVisible();
  });
});
||||||| parent of fb7e8c5 (feat: create button setting page without button position)
=======
import { render, screen } from '@testing-library/react';

import ButtonSettings from '../pages/buttonSettings';

describe('ButtonSettings page', () => {
  it('should render heading, textfield', () => {
    render(<ButtonSettings />);
    const heading = screen.getByRole('heading', { name: 'Button Settings' });
    expect(heading).toBeVisible();
  });
});
>>>>>>> fb7e8c5 (feat: create button setting page without button position)
