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
import { labels } from '../../en';
import customColors from "./CustomColors";
import Title from "./Title";
import { Organization, RowData } from './interfaces/interfaces';

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
	backgroundColor: theme.palette.common.white,
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

export default function OrganizationGrid() {
	const [rows, setRows] = useState<RowData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [open, setOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
	const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrganizationData = async () => {
			try {
				const response = await fetch("http://localhost:3000/organizations");
				const organizationData: Organization[] = await response.json();
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
				setError("Error fetching organization data");
			}
		};

		fetchOrganizationData();
	}, []);

	const itemsPerPage = 5;

	const filteredRows: RowData[] = rows.filter((row) =>
	row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase())
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
			await fetch(`http://localhost:3000/organizations/${id}`, {
				method: "DELETE",
			});
			const updatedRows = rows.filter((row) => row.id !== id);
			setRows(updatedRows);
		} catch (error) {
			console.error("Error deleting organization:", error);
		}
	};

	return (
		<React.Fragment>
			<StyledToolbar>
				<Title> {labels.title}</Title>
				<Search>
					<IconButton
						aria-label={labels.search}
						sx={{
							color: customColors.ashGray,
						}}
					>
						<SearchIcon />
					</IconButton>
					<InputBase
						placeholder={labels.searchPlaceholder}
						value={searchQuery}
						onChange={handleSearch}
						sx={{
							width: "90%",
							color: customColors.newBlack,
						}}
					/>
				</Search>
			</StyledToolbar>

			<Table size="small">
				<TableHead>
					<TableRow>
					<TableCell>{labels.name}</TableCell>
          <TableCell>{labels.tagline}</TableCell>
          <TableCell>{labels.banner}</TableCell>
          <TableCell>{labels.orgURL}</TableCell>
          <TableCell>{labels.borderRadius}</TableCell>
          <TableCell>{labels.buttonColors}</TableCell>
          <TableCell>{labels.authMethod}</TableCell>
          <TableCell align="center">{labels.actions}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{error ? (
						<TableRow>
							<TableCell colSpan={8}>
								<Typography variant="body1" color="error">
									{error}
								</Typography>
							</TableCell>
						</TableRow>
					) : paginatedRows.length === 0 ? (
						<TableRow>
							<TableCell colSpan={8}>
								<Typography variant="body1"> {labels.orgNotFound}</Typography>
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
									<ButtonGroup variant="text" aria-label="text button group" disableRipple>
										<Button
												aria-label={`edit-${row.id}`}
												title={labels.edit}
												sx={{
													color: customColors.darkGray
												}}
												onClick={() => {
													setSelectedRow(row);
													setEditRowIndex(row.id);
													setOpen(true);
												}}
											>
												<Edit />
										</Button>
										<Button
												aria-label={`delete-${row.id}`}
												title={labels.delete}
												onClick={() => handleRemoveOrg(row.id)}
												sx={{
													color: customColors.darkGray
												}}
											>
												<Delete />
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
					role="pagination"
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
						{labels.editOrganization}
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
								gap: "1rem",
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
									const response = await fetch(
										`http://localhost:3000/organizations/${editRowIndex}`,
										{
											method: "PUT",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify(selectedRow),
										}
									);
									const updatedRow = await response.json();
									const updatedRows = rows.map((row) =>
										row.id === editRowIndex ? updatedRow : row
									);
									setRows(updatedRows);
									setOpen(false);
								} catch (error) {
									console.error("Error updating organization:", error);
								}
							}
						}}
					>
						{labels.update}
					</Button>
				</Box>
			</StyledModal>
		</React.Fragment>
	);
}
