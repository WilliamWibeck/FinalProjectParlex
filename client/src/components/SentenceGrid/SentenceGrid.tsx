import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const SentenceGrid = ({ rows }) => {
  const columns = [
    { field: "sentence", headerName: "Sentence", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
  ];

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        className="bg-zinc-800 border border-[##6b46c1] text-gray-200"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#ffffff",
            color: "black",
            fontSize: "1rem",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: "white",
          },
          "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
            backgroundColor: "##6b46c1",
          },
          "& .MuiCheckbox-root": {
            color: "#6b46c1",
          },
        }}
      ></DataGrid>
    </Box>
  );
};

export default SentenceGrid;
