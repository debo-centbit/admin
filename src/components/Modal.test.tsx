import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpringModal from './Modal'; // Assuming this is the path to your SpringModal component

describe('SpringModal Component', () => {
  test('renders without errors', () => {
    render(<SpringModal />);
  });

  test('opens and closes modal on button click', () => {
    render(<SpringModal />);
  
    // Modal should be initially closed
    expect(screen.queryByText('Organization Form')).not.toBeInTheDocument();
  
    // Open modal
    userEvent.click(screen.getByTestId('buttonClick'));
  
    // Modal should be open
    const organizationFormText = screen.getByText(/Organization Form/i);
    expect(organizationFormText).toBeInTheDocument();
  
    // Close modal
    userEvent.click(screen.getByLabelText('close'));
  
    // Modal should be closed again
    expect(organizationFormText).not.toBeInTheDocument();
  });
  
  test('submits the form on button click', async () => {
    render(<SpringModal />);
    
    // Open modal
    userEvent.click(screen.getByTestId('buttonClick'));
    
  });
});
