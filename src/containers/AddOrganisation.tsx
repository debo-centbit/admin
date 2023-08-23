import React, {useState, useEffect}from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 110 },
  { field: "title", headerName: "title", width: 150},
  { field: "body", headerName: "body", width: 150 },
];
const AddOrganisation = () => {

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((data) => data.json())
    .then((data) => setTableData(data))
  })
    
  return <Box style={{ height: 400, width: '100%' }}>
    <DataGrid 
    columns={columns} 
    rows={tableData}
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 10,
        },
      },
    }}
    pageSizeOptions={[10]}
    checkboxSelection />
  </Box>;
};

export default AddOrganisation;
