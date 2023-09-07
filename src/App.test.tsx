import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-pro-sidebar', () => ({
  useMediaQuery: () => false, 
}));
describe('App Integration Test', () => {

  it('toggles dark mode when the button is clicked', () => {
    render(<App />);
    const darkModeToggle = screen.getByTestId('dark-mode-toggle');

    expect(document.body).not.toHaveClass('Mui-dark-mode');

    fireEvent.click(darkModeToggle);

    expect(document.body).toHaveClass('Mui-dark-mode');
  });
});
