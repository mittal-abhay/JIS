import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../mockdata";
import axios from "axios";
import { useEffect } from "react";

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
    { field: "EndDate", headerName: "EndDate", type: "date", flex: 1 }, // Add date field
  ];

  const [casesData, setCasesData] = useState([]);

  const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;

  useEffect(() => {
    const fetchCasesData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/court_cases/", {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        }
      );
        setCasesData(response.data);
      } catch (error) {
        console.error("Error fetching cases data:", error);
      }
    };

    fetchCasesData();
  }, []);
  
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);

 
  const rowData = casesData.map((data) => ({
    id: data._id,
    CIN: data.CIN,
    Lawyer: data.lawyer,
    Judge: data.judge,
    Status: data.status,
    EndDate: data.judgement ? new Date(data.judgement.date) : null
  }));

  const filteredRows = rowData.filter((row) => {
    if (!filterStartDate && !filterEndDate) {
      return true;
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


