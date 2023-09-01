import { Typography, Box  } from "@mui/material";
import React from "react";
import AddOrganisation from "../containers/AddOrganisation";
import Modal from "./Modal";

const Dashboard = () => {

  return (

    <Box>
      <Typography>ORGANIZATION TABLE</Typography>
      <Box>
        <AddOrganisation data-testid="add-organisation" />
        <Modal data-testid="modal"/>
      </Box>
    </Box>

  );
};
export default Dashboard;
