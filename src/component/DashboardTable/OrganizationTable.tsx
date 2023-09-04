import { LightMode, ModeNight } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, Paper, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import OrganizationGrid from "./OrganizationGrid";
import { labels } from "../../en"

const lightTheme = createTheme();
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export default function OrganizationTable() {
	const [mode, setMode] = useState<"light" | "dark">("light");

	const theme = mode === "light" ? lightTheme : darkTheme;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<Box
					component="main"
					sx={{
						backgroundColor:
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						color: theme.palette.text.primary,
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<ListItemButton component="a" href="#profile">
									<ListItemIcon>
										{mode === "light" ? <LightMode aria-label={labels.lightMode} data-testid="light-mode-icon" /> : <ModeNight aria-label={labels.darkMode} data-testid="dark-mode-icon"/>}
									</ListItemIcon>
									<Switch
                    role="switch"
										onChange={(e) =>
											setMode(mode === "light" ? "dark" : "light")
										}
									/>
								</ListItemButton>
                
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										overFlow: "auto",
										minWidth: "800px",
									}}
								>
									<OrganizationGrid />
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export { darkTheme, lightTheme };
