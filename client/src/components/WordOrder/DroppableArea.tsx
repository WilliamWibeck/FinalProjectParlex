import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

const DroppableArea = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "middle",
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        padding: "20px",
        border: `2px solid ${isOver ? "#4caf50" : "#ccc"}`,
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        margin: "20px auto",
        width: "80%",
        transition: "border-color 0.2s ease",
      }}
    >
      {children}
    </Box>
  );
};

export default DroppableArea;
