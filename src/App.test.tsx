import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Integration Test', () => {
  it('renders the App component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Your App Title')).toBeInTheDocument();
  });

  it('toggles dark mode when the button is clicked', () => {
    const { getByTestId } = render(<App />);

    const darkModeToggle = getByTestId('dark-mode-toggle');

    expect(document.body).not.toHaveClass('Mui-dark-mode');

    fireEvent.click(darkModeToggle);

    expect(document.body).toHaveClass('Mui-dark-mode');
  });
});
