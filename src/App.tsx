import { Box } from "@mui/material";
import "./App.css";
import OrganizationTable from "./component/DashboardTable/OrganizationTable";

function App() {

  return (
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <OrganizationTable />
      </Box>
  );
}

export default App;
