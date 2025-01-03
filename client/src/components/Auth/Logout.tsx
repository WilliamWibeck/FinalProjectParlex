import { Button } from "@mui/material";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error: unknown) {
      console.error(error.message);
    }
  };

  return <Button onClick={handleLogout}>Logout :D</Button>;
};

export default Logout;
