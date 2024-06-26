import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material"; // Import the delete ico
import axios from "axios";
import { useEffect, useState } from "react";


const ManageLawyers = () => {
  const colors = {
    greenAccent: "#4CAF50",
    blueAccent: "#7E4EFC",
    primary: "#fff",
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row.id)} 
        >
          <Delete />
        </IconButton>
      ),
    },
  ];
  const [casesData, setCasesData] = useState([]);

  const token = JSON.parse(localStorage.getItem('isLoggedIn')).token;

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/lawyer", {
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

    fetchLawyers();
  }, []);
  // Adjusting mockDataTeam to have only id, username, and role
  const adjustedMockData = casesData.map((data) => ({
    id: data._id,
    name: data.username,
    role: 'Lawyer',
  }));

    
  const handleDelete = async (id) => {
    // Ask for confirmation before deletion
    const confirmed = window.confirm("Do you want to delete this lawyer?");
    
    // If user confirms deletion, proceed with delete logic
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
        // Handle deletion success
        console.log("Lawyer deleted successfully");
      } catch (error) {
        // Handle deletion error
        console.error("Error deleting lawyer:", error);
      }
    } else {
      // If user cancels deletion, do nothing
      console.log("Deletion cancelled by user");
    }
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/lawyer", {
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
    fetchLawyers();
    }, []);


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
        <DataGrid rows={adjustedMockData} columns={columns} />
      </Box>
    </Box>
  );
};

export default ManageLawyers;
