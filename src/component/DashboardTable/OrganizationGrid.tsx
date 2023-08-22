import { Close, Delete, Edit } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	Button,
	ButtonGroup,
	IconButton,
	InputBase,
	Modal,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Typography,
	styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "./Title";

import axios from "axios";

interface RowData {
	id: number;
	name: string;
	tagline: string;
	banner: string;
	organizationURL: string;
	borderRadius: string;
	buttonColors: string;
	authMethod: string;
	[key: string]: string | number;
}

interface Organization {
	id: number;
	name: string;
	tagline: string;
	banner: string;
	organizationURL: string;
	borderRadius: string;
	buttonColors: string;
	authMethod: string;
}

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	justifyContent: "space-between",
});

const StyledPagination = styled(Box)({
	display: "flex",
	justifyContent: "center",
	padding: "20px 0px 10px 0px",
});

const Search = styled("div")(({ theme }) => ({
	backgroundColor: "#fff",
	padding: "5px 15px",
	borderRadius: theme.shape.borderRadius,
	minWidth: "30%",
	width: "auto",
	border: "1px solid black",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "10px",
}));

const StyledModal = styled(Modal)({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

function createData(
	id: number,
	name: string,
	tagline: string,
	banner: string,
	organizationURL: string,
	borderRadius: string,
	buttonColors: string,
	authMethod: string
): RowData {
	return {
		id,
		name,
		tagline,
		banner,
		organizationURL,
		borderRadius,
		buttonColors,
		authMethod,
	};
}

export default function TableGrid() {
	const [rows, setRows] = useState<RowData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [open, setOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
	const [editRowIndex, setEditRowIndex] = useState<number | null>(null);

	useEffect(() => {
		const fetchOrganizationData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/organizations");
				const organizationData: Organization[] = response.data;
				const initialRows: RowData[] = organizationData.map((organization) =>
					createData(
						organization.id,
						organization.name,
						organization.tagline,
						organization.banner,
						organization.organizationURL,
						organization.borderRadius,
						organization.buttonColors,
						organization.authMethod
					)
				);
				setRows(initialRows);
			} catch (error) {
				console.error("Error fetching organization data:", error);
			}
		};

		fetchOrganizationData();
	}, []);

	const itemsPerPage = 5;

	const filteredRows = rows.filter((row) =>
		row.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedRows = filteredRows.slice(startIndex, endIndex);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
		setPage(1);
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const handleRemoveOrg = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/organizations/${id}`);
			const updatedRows = rows.filter((row) => row.id !== id);
			setRows(updatedRows);
		} catch (error) {
			console.error("Error deleting organization:", error);
		}
	};

	return (
		<React.Fragment>
			<StyledToolbar>
				<Title>Organizations</Title>
				<Search>
					<IconButton
						aria-label="search"
						sx={{
							color: "#212121",
						}}
					>
						<SearchIcon />
					</IconButton>
					<InputBase
						placeholder="Search"
						value={searchQuery}
						onChange={handleSearch}
						sx={{
							width: "90%",
							color: "#000",
						}}
					/>
				</Search>
			</StyledToolbar>

			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Tagline</TableCell>
						<TableCell>Banner</TableCell>
						<TableCell>Organization URL</TableCell>
						<TableCell>Border Radius</TableCell>
						<TableCell>Button Colors</TableCell>
						<TableCell>Authentication Method</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedRows.length === 0 ? (
						<TableRow>
							<TableCell colSpan={8}>
								<Typography variant="body1">Organization not found.</Typography>
							</TableCell>
						</TableRow>
					) : (
						paginatedRows.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.tagline}</TableCell>
								<TableCell>{row.banner}</TableCell>
								<TableCell>{row.organizationURL}</TableCell>
								<TableCell>{row.borderRadius}</TableCell>
								<TableCell>{row.buttonColors}</TableCell>
								<TableCell>{row.authMethod}</TableCell>
								<TableCell align="center">
									<ButtonGroup variant="text" aria-label="text button group">
										<Button>
											<IconButton
												aria-label={`edit-${row.id}`}
												title="Edit"
												sx={{
													"&:hover": {
														backgroundColor: "transparent",
													},
												}}
												onClick={() => {
													setSelectedRow(row);
													setEditRowIndex(row.id);
													setOpen(true);
												}}
											>
												<Edit />
											</IconButton>
										</Button>
										<Button>
											<IconButton
												aria-label={`delete-${row.id}`}
												title="Delete"
												onClick={() => handleRemoveOrg(row.id)}
												sx={{
													"&:hover": {
														backgroundColor: "transparent",
													},
												}}
											>
												<Delete />
											</IconButton>
										</Button>
									</ButtonGroup>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			<StyledPagination>
				<Pagination
					count={Math.ceil(filteredRows.length / itemsPerPage)}
					variant="outlined"
					page={page}
					onChange={handlePageChange}
				/>
			</StyledPagination>

			<StyledModal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					p={3}
					borderRadius={3}
					bgcolor={"background.default"}
					color={"text.primary"}
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						width: "auto",
						maxWidth: "38vw",
						height: "auto",
						minHeight: "300px",
						gap: "30px",
					}}
					noValidate
					autoComplete="off"
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Typography variant="h6" color="gray" textAlign="center">
							Edit Organization
						</Typography>
						<IconButton
							aria-label="close"
							title="Close"
							onClick={() => setOpen(false)}
						>
							<Close />
						</IconButton>
					</Box>

					{selectedRow && editRowIndex !== null && (
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: "16px",
							}}
						>
							{Object.keys(selectedRow).map((key) => (
								<TextField
									key={key}
									id={`outlined-${key}`}
									label={key}
									defaultValue={selectedRow[key]}
									sx={{
										width: "calc(50% - 8px)",
									}}
									onChange={(e) => {
										const updatedValue = e.target.value;
										setSelectedRow(
											(prevSelectedRow) =>
												({
													...prevSelectedRow,
													[key]: updatedValue,
												} as RowData)
										);
									}}
								/>
							))}
						</Box>
					)}
					<Button
						fullWidth
						variant="contained"
						aria-label="update-button"
						onClick={async () => {
							if (selectedRow && editRowIndex !== null) {
								try {
									const response = await axios.put(
										`http://localhost:3000/organizations/${editRowIndex}`,
										selectedRow
									);
									const updatedRows = rows.map((row) =>
										row.id === editRowIndex ? response.data : row
									);
									setRows(updatedRows);
									setOpen(false);
								} catch (error) {
									console.error("Error updating organization:", error);
								}
							}
						}}
					>
						Update
					</Button>
				</Box>
			</StyledModal>
		</React.Fragment>
	);
}
