import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import userEvent from "@testing-library/user-event"

test("renders organization table text", () => {
  render(<Dashboard />);
  const organizationTableText = screen.getByText("ORGANIZATION TABLE");
  expect(organizationTableText).toBeInTheDocument();
});

test("renders AddOrganisation component", async () => {
  render(<Dashboard />);
  
  await waitFor(() => {
    const addOrganisationComponent = screen.getByTestId("add-organisation");
    expect(addOrganisationComponent).toBeInTheDocument();
  });
});
test("renders Modal component", () => {
    render(<Dashboard />);
    const button = screen.getByTestId("buttonClick");
  userEvent.click(button);
  });
  
  
  
  
  
  