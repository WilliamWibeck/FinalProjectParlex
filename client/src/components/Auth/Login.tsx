import { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box className="h-screen w-screen flex items-center justify-center flex-col gap-5 bg-zinc-900">
      <Paper
        className={`!bg-zinc-800 text-white flex flex-row w-[30vh] h-[40vh] items-center justify-center relative 
        transition-opacity duration-1000 ease-in-out`}
      >
        <Box className="w-[90%] mx-5 flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold text-center mb-12 text-white">
            Welcome Back! Please Login.
          </h1>
          <Box className="flex flex-col max-w-[600px]">
            <form onSubmit={handleLogin}>
              <Box className="flex flex-col gap-2">
                <TextField
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full !text-white"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: "gray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6b46c1",
                      },
                    },
                    input: {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full !text-white"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: "gray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6b46c1",
                      },
                    },
                    input: {
                      color: "white",
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    borderColor: "gray",
                    borderWidth: "2px",
                    color: "gray",
                    "&:hover": {
                      borderColor: "#5a3aab",
                      background: "inherit",
                      color: "#5a3aab",
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </form>
            <p className="text-white">
              Dont have an account? <br /> <a href="/signup">Create one!</a>
            </p>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
