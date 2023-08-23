import "./App.css";
import NavBar from "./components/NavBar";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./config/theme";
import SideBar from "./components/SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <NavBar />
          <Box sx={styles.container}>
            <BrowserRouter>
              <SideBar />
              <Box component={"main"} sx={styles.mainSection}>
                <AppRoutes />
              </Box>
            </BrowserRouter>
          </Box>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}
const styles = {
  container: {
    display: "flex",
    bgColor: "neutral.light",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    padding: 1,
    width: "100%",
    height: "100%",
  },
};

export default App;
