// import React, { useEffect, useState } from 'react';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { Box } from "@mui/material";
// import axios from "axios";

// interface Team {
//   id: number;
//   abbreviation: string;
//   city: string;
//   conference: string;
//   division: string;
//   full_name: string;
//   name: string;
// }

// const DataTable: React.FC = () => {
//   const [data, setData] = useState<Team[]>([]);

//   const getData = async () => {
//     try {
//       const response = await axios.get("https://www.balldontlie.io/api/v1/teams");
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "Name", width: 130 },
//     { field: "abbreviation", headerName: "Abbreviation", width: 130 },
//     { field: "city", headerName: "City", width: 130 },
//     { field: "conference", headerName: "Conference", width: 130 },
//     { field: "division", headerName: "Division", width: 130 },
//   ];

//   const rows = data.map((row) => ({
//     id: row.id,
//     name: row.name,
//     abbreviation: row.abbreviation,
//     city: row.city,
//     conference: row.conference,
//     division: row.division
//   }));

//   return (
//     <Box sx={{ height: 500, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSizeOptions={[25, 50, 100]}
//         // rowsPerPageOptions={[10]}
//       />
//     </Box>
//   );
// }

// export default DataTable;


import React from 'react'

const DataTable = () => {
  return (
    <div>DataTable</div>
  )
}

export default DataTable