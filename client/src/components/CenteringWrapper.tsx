import Box from "@mui/material/Box";
import React from "react";

type Props = {};

const CenteringWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteringWrapper;
