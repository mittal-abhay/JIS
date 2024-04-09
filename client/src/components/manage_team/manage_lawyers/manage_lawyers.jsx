import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material"; // Import the delete icon
import { mockDataTeam } from "../../mockdata";

const ManageLawyers = () => {
  const colors = {
    greenAccent: "#4CAF50",
    blueAccent: "#7E4EFC",
    primary: "#fff",
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Username", flex: 1 },
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

  // Adjusting mockDataTeam to have only id, username, and role
  const adjustedMockData = mockDataTeam.map((data) => ({
    id: data.id,
    username: data.name,
    name: data.name,
    role: 'Lawyer',
  }));

  const handleDelete = (id) => {
    // Implement delete logic here
    console.log("Deleting judge with ID:", id);
    // Update the state or perform API call to delete the judge
  };

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
