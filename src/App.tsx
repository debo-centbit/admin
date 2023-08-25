import { Box, createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import OrganizationTable from "./component/DashboardTable/OrganizationTable";

function App() {
	const mode = "light";
	const darkTheme = createTheme({
		palette: {
			mode: mode,
		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<Box bgcolor={"background.default"} color={"text.primary"}>
				<OrganizationTable />
			</Box>
		</ThemeProvider>
	);
}

export default App;
