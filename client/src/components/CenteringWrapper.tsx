import Box from "@mui/material/Box";
import React from "react";

const CenteringWrapper = ({ children }) => {
  return (
    <Box className="flex items-center justify-center min-h-screen">
      {children}
    </Box>
  );
};

export default CenteringWrapper;
