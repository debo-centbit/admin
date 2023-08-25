import "@testing-library/jest-dom";
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import organizationData from "../../../organization.json";
import OrganizationGrid from "../DashboardTable/OrganizationGrid";

afterEach(() => {
	cleanup();
});

console.error = (message) => {
	if (message.startsWith("Warning: validateDOMNesting")) {
		return;
	}
	throw new Error(message);
};

describe("OrganizationGrid Component", () => {
	let mockAxios: MockAdapter;

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);
	});

	afterEach(() => {
		mockAxios.reset();
	});

	test.only("renders the table with initial data", () => {
		render(<OrganizationGrid />);
		const table = screen.getByRole("table");
		expect(table).toBeInTheDocument();
		const rows = screen.getAllByRole("row");
		expect(rows.length).toBeGreaterThan(0);
	});

	it("filters organizations based on search query", () => {
		render(<OrganizationGrid />);
		const searchInput = screen.getByPlaceholderText("Search");
		fireEvent.change(searchInput, { target: { value: "Name 1" } });
		const filteredRow = screen.getByText("Name 1");
		expect(filteredRow).toBeInTheDocument();
	});

	it("displays paginated rows", () => {
		render(<OrganizationGrid />);
		const nextPageButton = screen.getByLabelText("Go to next page");
		fireEvent.click(nextPageButton);
		const secondPageRow = screen.getByText("Name 6");
		expect(secondPageRow).toBeInTheDocument();
	});
	it("opens edit modal on edit button click", async () => {
		render(<OrganizationGrid />);
		const editButton = screen.getByLabelText(`edit-${0}`);
		fireEvent.click(editButton);
		await waitFor(() => {
			const editModal = screen.getByText("Edit Organization");
			expect(editModal).toBeInTheDocument();
		});
	});
	it("deletes organization on delete button click", async () => {
		render(<OrganizationGrid />);
		const deleteButton = screen.getByLabelText(`delete-${0}`);
		fireEvent.click(deleteButton);
		await waitFor(() => {
			const deletedRow = screen.queryByText("Name 1");
			expect(deletedRow).toBeNull();
		});
	});
	it("updates organization data on edit", () => {
		render(<OrganizationGrid />);
		const editButton = screen.getByLabelText(`edit-${0}`);
		fireEvent.click(editButton);
		const nameInput = screen.getByLabelText("name");
		fireEvent.change(nameInput, { target: { value: "New Name" } });
		const updateButton = screen.getByLabelText("update-button");
		fireEvent.click(updateButton);
		const updatedRow = screen.getByText("New Name");
		expect(updatedRow).toBeInTheDocument();
	});
	it("paginates rows correctly", async () => {
		mockAxios
			.onGet("http://localhost:3000/organizations")
			.reply(200, organizationData.organizations);
		render(<OrganizationGrid />);

		const nextPageButton = screen.getByLabelText("Go to next page");
		fireEvent.click(nextPageButton);

		const secondPageRow = screen.getByText("Name 6");
		expect(secondPageRow).toBeInTheDocument();
	});
	it("displays message for no organizations", async () => {
		mockAxios.onGet("http://localhost:3000/organizations").reply(200, []);
		render(<OrganizationGrid />);

		await waitFor(() => {
			const emptyMessage = screen.getByText("Organization not found.");
			expect(emptyMessage).toBeInTheDocument();
		});
	});
	it("handles fetch error", async () => {
		mockAxios.onGet("http://localhost:3000/organizations").reply(500);
		render(<OrganizationGrid />);

		await waitFor(() => {
			const errorElement = screen.getByText("Error fetching organization data");
			expect(errorElement).toBeInTheDocument();
		});
	});
});

// import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
// import OrganizationGrid from '../DashboardTable/OrganizationGrid';

// import '@testing-library/jest-dom'

// afterEach(() => {
//   cleanup()
// })

// console.error = (message) => {
//   if (message.startsWith('Warning: validateDOMNesting')) {
//     return;
//   }
//   throw new Error(message);
// };

// describe('OrganizationGrid Component', () => {
//   it('renders the table with initial data', () => {
//     console.log(document.body.innerHTML);
//     render(<OrganizationGrid />);
//     const table = screen.getByRole('table');
//     expect(table).toBeInTheDocument();
//     const rows = screen.getAllByRole('row');
//     expect(rows.length).toBeGreaterThan(0);
//   });

//   it('filters organizations based on search query', () => {
//     render(<OrganizationGrid />);
//     const searchInput = screen.getByPlaceholderText('Search');
//     fireEvent.change(searchInput, { target: { value: 'Name 1' } });
//     const filteredRow = screen.getByText('Name 1');
//     expect(filteredRow).toBeInTheDocument();
//   });

// it('displays paginated rows', () => {
//     render(<OrganizationGrid />);
//     const nextPageButton = screen.getByLabelText('Go to next page');
//     fireEvent.click(nextPageButton);
//     const secondPageRow = screen.getByText('Name 6');
//     expect(secondPageRow).toBeInTheDocument();
//   });
//   it('opens edit modal on edit button click', async () => {
//     render(<OrganizationGrid />);
//     const editButton = screen.getByLabelText(`edit-${0}`);
//     fireEvent.click(editButton);
//     await waitFor(() => {
//       const editModal = screen.getByText('Edit Organization');
//       expect(editModal).toBeInTheDocument();
//     });
//   });
//   it('deletes organization on delete button click', async () => {
//     render(<OrganizationGrid />);
//     const deleteButton = screen.getByLabelText(`delete-${0}`);
//     fireEvent.click(deleteButton);
//     await waitFor(() => {
//       const deletedRow = screen.queryByText('Name 1');
//       expect(deletedRow).toBeNull();
//     });
//   });
//   it('updates organization data on edit', () => {
//     render(<OrganizationGrid />);
//     const editButton = screen.getByLabelText(`edit-${0}`);
//     fireEvent.click(editButton);
//     const nameInput = screen.getByLabelText('name');
//     fireEvent.change(nameInput, { target: { value: 'New Name' } });
//     const updateButton = screen.getByLabelText('update-button');
//     fireEvent.click(updateButton);
//     const updatedRow = screen.getByText('New Name');
//     expect(updatedRow).toBeInTheDocument();
//   });
// })
