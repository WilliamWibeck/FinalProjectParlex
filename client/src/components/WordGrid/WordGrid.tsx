import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";

interface WordGridProps {
  rows: GridRowsProp;
}

const WordGrid = ({ rows }: WordGridProps) => {
  const columns: GridColDef[] = [
    { field: "french", headerName: "French", flex: 1 },
    { field: "english", headerName: "English", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
  ];

  return (
    <Box className="h-full w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        className="bg-zinc-800 border border-[#6b46c1] text-gray-200"
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
            backgroundColor: "#6b46c1",
          },
          "& .MuiCheckbox-root": {
            color: "#6b46c1",
          },
        }}
      />
    </Box>
  );
};

export default WordGrid;
