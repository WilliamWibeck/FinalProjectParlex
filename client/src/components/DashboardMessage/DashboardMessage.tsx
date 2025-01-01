import { Box, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const DashboardMessage = () => {
  const user = auth.currentUser;

  return (
    <Box>
      <Typography variant="h2">Welcome {user?.displayName}!</Typography>
    </Box>
  );
};

export default DashboardMessage;
