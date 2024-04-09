import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../mockdata";

const AllCases = () => {
  const colors = {
    greenAccent: "#4CAF50",
    blueAccent: "#7E4EFC",
    primary: "#fff",
  };

  const columns = [
    { field: "CIN", headerName: "CIN" },
    { field: "Lawyer", headerName: "Lawyer", flex: 1 },
    { field: "Judge", headerName: "Judge", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "Date", headerName: "Date", type: "date", flex: 1 }, // Add date field
  ];

  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);

  // Adjusting mockDataTeam to have only CIN, Lawyer, Judge, Status, and Date
  const adjustedMockData = mockDataTeam.map((data) => ({
    id: data.id,
    CIN: data.id,
    Lawyer: data.name,
    Judge: "Sample Judge", // You may replace this with actual judge names
    Status: data.status, // You may replace this with actual status
    Date: data.date, // Replace 'date' with the actual date field in your mock data
  }));

  // Filtering logic based on start and end dates
  const filteredRows = adjustedMockData.filter((row) => {
    if (!filterStartDate && !filterEndDate) {
      return true; // No filter applied
    }
    if (!filterStartDate) {
      return new Date(row.Date) <= filterEndDate;
    }
    if (!filterEndDate) {
      return new Date(row.Date) >= filterStartDate;
    }
    return (
      new Date(row.Date) >= filterStartDate && new Date(row.Date) <= filterEndDate
    );
  });

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent,
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          componentsProps={{
            toolbar: {
              filterStartDate,
              setFilterStartDate,
              filterEndDate,
              setFilterEndDate,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AllCases;
