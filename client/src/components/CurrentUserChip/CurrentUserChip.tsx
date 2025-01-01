import { Avatar, Chip } from "@mui/material";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const CurrentUserChip = () => {
  const currentUserName = auth.currentUser?.displayName;

  return (
    <Chip
      sx={{
        color: "white",

        backgroundColor: "rgba(202, 202, 202, 0.25)",
      }}
      label={currentUserName}
      icon={<Avatar />}
    />
  );
};

export default CurrentUserChip;
