import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "./SideBar";

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false, // You can adjust this value based on your needs
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

describe("SideBar Component", () => {
  test("displays company name and tagline when expanded", () => {
    render(<SideBar  />, { wrapper: MemoryRouter });

    const companyName = screen.getByText("Company Name");
    const companyTagline = screen.getByText("Company Tagline");

    expect(companyName).toBeInTheDocument();
    expect(companyTagline).toBeInTheDocument();
  });

  test("displays navigation links", () => {
    render(<SideBar />, { wrapper: MemoryRouter });

    const dashboardLink = screen.getByText("Dashboard");
    const organizationTableLink = screen.getByText("OrganizationTable");
    const settingsLink = screen.getByText("Settings");
    const logoutLink = screen.getByText("Logout");

    expect(dashboardLink).toBeInTheDocument();
    expect(organizationTableLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });
});
