import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { ProSidebarProvider } from 'react-pro-sidebar';

test('renders NavBar correctly', () => {
  render(
    <ProSidebarProvider>
      <NavBar check={true} change={() => {}} children="UserName" />
    </ProSidebarProvider>
  );

  // Check if the NavBar is rendered
  const navBarElement = screen.getByLabelText('account of current user');
  expect(navBarElement).toBeInTheDocument();
});

test('toggles sidebar on button click', () => {
  render(
    <ProSidebarProvider>
      <NavBar check={true} change={() => {}} children="UserName" />
    </ProSidebarProvider>
  );

  // Check if the button for toggling sidebar is present
  const toggleSidebarButton = screen.getByLabelText('open drawer');
  expect(toggleSidebarButton).toBeInTheDocument();

  // Simulate a button click
  fireEvent.click(toggleSidebarButton);

  // You can add assertions here to check the behavior of sidebar toggling
});

test('changes the switch on input change', () => {
  const mockChange = jest.fn(); // Mock change handler function
  render(
    <ProSidebarProvider>
      <NavBar check={true} change={mockChange} children="UserName" />
    </ProSidebarProvider>
  );

  // Check if the switch input is present
  const switchInput = screen.getByLabelText('Size switch demo');
  expect(switchInput).toBeInTheDocument();

  // Simulate input change
  fireEvent.click(switchInput);

  // Check if the change handler was called
  expect(mockChange).toHaveBeenCalledTimes(1);
});

// You can add more tests for other functionality in the NavBar component
