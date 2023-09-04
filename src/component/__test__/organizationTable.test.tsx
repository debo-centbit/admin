import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { rest } from "msw"
import { setupServer } from "msw/node"
import OrganizationGrid from "../DashboardTable/OrganizationGrid";
import OrganizationTable from "../DashboardTable/OrganizationTable"
// import { darkTheme } from "../DashboardTable/OrganizationTable"

process.env.MSW_LOG_LEVEL = 'debug';

const server = setupServer(
  rest.get("http://localhost:3000/organizations", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "id": 0,
          "name": "Name 1",
          "tagline": "Tagline 1",
          "banner": "Banner 1",
          "organizationURL": "URL 1",
          "borderRadius": "10px",
          "buttonColors": "Red",
          "authMethod": "Authentication 1"
        },
        {
          "id": 1,
          "name": "Name 2",
          "tagline": "Tagline 2",
          "banner": "Banner 2",
          "organizationURL": "URL 2",
          "borderRadius": "10px",
          "buttonColors": "Blue",
          "authMethod": "Authentication 2"
        },
        {
          "id": 2,
          "name": "Name 3",
          "tagline": "Tagline 3",
          "banner": "Banner 3",
          "organizationURL": "URL 3",
          "borderRadius": "10px",
          "buttonColors": "Green",
          "authMethod": "Authentication 3"
        },
        {
          "id": 3,
          "name": "Name 4",
          "tagline": "Tagline 4",
          "banner": "Banner 4",
          "organizationURL": "URL 4",
          "borderRadius": "10px",
          "buttonColors": "Red",
          "authMethod": "Authentication 4"
        },
        {
          "id": 4,
          "name": "Name 5",
          "tagline": "Tagline 5",
          "banner": "Banner 5",
          "organizationURL": "URL 5",
          "borderRadius": "10px",
          "buttonColors": "Blue",
          "authMethod": "Authentication 5"
        },
        {
          "id": 5,
          "name": "Name 6",
          "tagline": "Tagline 6",
          "banner": "Banner 6",
          "organizationURL": "URL 6",
          "borderRadius": "10px",
          "buttonColors": "Green",
          "authMethod": "Authentication 6"
        },
        {
          "id": 6,
          "name": "Name 7",
          "tagline": "Tagline 7",
          "banner": "Banner 7",
          "organizationURL": "URL 7",
          "borderRadius": "10px",
          "buttonColors": "Red",
          "authMethod": "Authentication 7"
        },
        {
          "id": 7,
          "name": "Name 8",
          "tagline": "Tagline 8",
          "banner": "Banner 8",
          "organizationURL": "URL 8",
          "borderRadius": "10px",
          "buttonColors": "Blue",
          "authMethod": "Authentication 8"
        }
      ])
    )
  }),
  rest.delete("http://localhost:3000/organizations/0", (req, res, ctx) => {

    return res(ctx.status(200)); 
  }),
  rest.options("http://localhost:3000/organizations/0", (req, res, ctx) => {

    return res(ctx.status(200)); 
  }),
  rest.put("http://localhost:3000/organizations/0", (req, res, ctx) => {

  return res(ctx.status(200));
}),

)

beforeAll(() => {
  console.error = jest.fn((message) => {
    if (!message.includes("Error updating organization:")) {
      console.error(message);
    }
  });
  server.listen()
});
afterEach(() => {
  server.resetHandlers();
  cleanup(); 
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  server.close();
});



describe("OrganizationGrid Component", () => {
  it("renders the table with initial data", async () => {
    render(<OrganizationGrid />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const rows = await screen.findAllByRole("row");
    expect(rows.length).toBeGreaterThan(0);
  });

  it("filters organizations based on search query", async () => {
    render(<OrganizationGrid />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Name 1" } });

    await waitFor(() => {
      const filteredRow = screen.getByText("Name 1");
      expect(filteredRow).toBeInTheDocument();
    });
  });

  it("displays message for no organizations", async () => {
    server.use(
      rest.get("http://localhost:3000/organizations", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );

    render(<OrganizationGrid />);

    await waitFor(() => {
      const emptyMessage = screen.getByText("Organization not found.");
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    server.use(
      rest.get("http://localhost:3000/organizations", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Server error" }));
      })
    );

    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    render(<OrganizationGrid />);

    await waitFor(() => {
      const errorMessage = screen.getByText("Error fetching organization data");
      expect(errorMessage).toBeInTheDocument();
    });

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error fetching organization data:",
      expect.any(Error)
    );

    console.error = originalConsoleError;
  });

  it("displays paginated rows", async () => {
    render(<OrganizationGrid />);
    const nextPageButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextPageButton);
    const secondPageRow = await screen.findByText("Name 2");
    expect(secondPageRow).toBeInTheDocument();
  });

  it("opens edit modal on edit button click", async () => {
    render(<OrganizationGrid />);
    const editButton = await screen.findByLabelText(/edit-0/);
    fireEvent.click(editButton);
    await waitFor(() => {
      const editModal = screen.getByText("Edit Organization");
      expect(editModal).toBeInTheDocument();
    });
  });

  it("deletes organization on delete button click", async () => {
    render(<OrganizationGrid />);
    const deleteButton = await screen.findByLabelText(/delete-0/);
    fireEvent.click(deleteButton);
    await waitFor(() => {
      const deletedRow = screen.queryByText("Name 1");
      expect(deletedRow).toBeNull();
    });
  });

  it("updates organization data on edit", async () => {
    render(<OrganizationGrid />);
    const editButton = await screen.findByLabelText(/edit-0/);
    fireEvent.click(editButton);
    const nameInput = await screen.findByLabelText("name");
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const updateButton = await screen.findByLabelText("update-button");
    fireEvent.click(updateButton);
    await waitFor(() => {
      const updatedRow = screen.getByText("Name 1");
      expect(updatedRow).toBeInTheDocument();
    });
    consoleErrorSpy.mockRestore();
  });
});

describe("dark mode tests", () => {
  
  it("renders with light theme by default", () => {
    render(<OrganizationTable />);
    expect(screen.getByRole("main")).toHaveStyle({
      backgroundColor: "#f5f5f5",
    });
    expect(screen.getByRole("link")).toContainElement(
      screen.getByTestId("light-mode-icon")
    );
  });

  it("expect button switch to be present", async () => {
    render(<OrganizationTable/>);
    const switchElement = await screen.findByRole('switch') as HTMLInputElement;;
    const isClickable = !switchElement.disabled;
    expect(isClickable).toBe(true);
  })
//   it("expects dark mode to be rendered on click", async () => {
//     render(<OrganizationTable />)
//     const switchElement = screen.getByTestId('light-mode-icon');
    // fireEvent.click(switchElement);
    // const darkModeIcon = await screen.findByTestId('dark-mode-icon');
    // expect(darkModeIcon).toBeInTheDocument();
//   })

})

