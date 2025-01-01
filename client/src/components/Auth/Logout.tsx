import { Button } from "@mui/material";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

const Logout = (props: Props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return <Button onClick={handleLogout}>Logout :D</Button>;
};

export default Logout;
