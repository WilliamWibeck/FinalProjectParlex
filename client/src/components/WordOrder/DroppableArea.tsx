import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const DroppableArea = ({ children }: { children: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "middle",
  });

  return (
    <Box
      ref={setNodeRef}
      className={`flex flex-1 justify-center items-center flex-wrap gap-2.5 p-5 border-2 rounded-lg bg-gray-100 w-4/5 mx-auto transition-colors duration-200 ${
        isOver ? "border-green-500" : "border-gray-300"
      }`}
    >
      {children}
    </Box>
  );
};

export default DroppableArea;
