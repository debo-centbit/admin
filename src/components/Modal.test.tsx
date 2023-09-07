import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpringModal from './Modal';

describe('SpringModal Component', () => {
  test('renders without errors', () => {
    render(<SpringModal />);
  });

  test('opens and closes modal on button click', () => {
    render(<SpringModal />);
    expect(screen.queryByText('Organization Form')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('buttonClick'));

    const organizationFormText = screen.getByText(/Organization Form/i);
    expect(organizationFormText).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('close'));

    expect(organizationFormText).not.toBeInTheDocument();
  });

  test('submits the form on button click', async () => {
    render(<SpringModal />);

    userEvent.click(screen.getByTestId('buttonClick'));
  });
});
