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

  const navBarElement = screen.getByLabelText('account of current user');
  expect(navBarElement).toBeInTheDocument();
});

test('toggles sidebar on button click', () => {
  render(
    <ProSidebarProvider>
      <NavBar check={true} change={() => {}} children="UserName" />
    </ProSidebarProvider>
  );
  const toggleSidebarButton = screen.getByLabelText('open drawer');
  expect(toggleSidebarButton).toBeInTheDocument();

  fireEvent.click(toggleSidebarButton);

});

test('changes the switch on input change', () => {
  const mockChange = jest.fn(); 
  render(
    <ProSidebarProvider>
      <NavBar check={true} change={mockChange} children="UserName" />
    </ProSidebarProvider>
  );

  const switchInput = screen.getByLabelText('Size switch demo');
  expect(switchInput).toBeInTheDocument();

  fireEvent.click(switchInput);

  expect(mockChange).toHaveBeenCalledTimes(1);
});

