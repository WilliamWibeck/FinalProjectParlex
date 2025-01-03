import { FormEvent, useEffect, useState } from "react";
import { Alert, Box, Button, Paper, TextField } from "@mui/material";
import { signup } from "../../firebase/auth";
import IntroPage from "../IntroPage/IntroPage";
import { useNavigate } from "react-router-dom";
import { useReward } from "react-rewards";
import { FirebaseError } from "firebase/app";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [introShown, setIntroShown] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [signupFormVisible, setSignupFormVisible] = useState(false);
  const navigate = useNavigate();

  const toggleAlert = () => {
    setAlertVisible(true);
  };

  const { reward: confettiReward } = useReward("confettiReward", "confetti");

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      //Här callas signup funktionen som kommer från firebase med värdena från fälten.
      await signup({ email, password, firstName, lastName });
      confettiReward();
      toggleAlert();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("The email address is already in use.");
            break;
          case "auth/invalid-email":
            setError("The email address is invalid.");
            break;
          case "auth/weak-password":
            setError("Please choose a more secure password.");
            break;
          default:
            setError("An error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleIntroState = () => {
    setIntroShown(true);
  };

  //Hanterar statet för ifall introt har visats eller inte.
  useEffect(() => {
    if (introShown) {
      setTimeout(() => {
        setSignupFormVisible(true);
      }, 500);
    }
  }, [introShown]);

  return (
    <Box className="h-screen w-screen flex items-center justify-center flex-col gap-5 bg-zinc-900">
      {!introShown ? (
        <IntroPage handleIntroShown={handleIntroState} />
      ) : (
        <Paper
          className={`!bg-zinc-800 text-white flex flex-row w-[30vh] h-[40vh] items-center justify-center relative 
          transition-opacity duration-1000 ease-in-out ${
            signupFormVisible ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <span id="confettiReward" className="absolute"></span>
          <Box className="w-[90%] mx-5 flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold text-center mb-12 text-white">
              Create an account and get started!
            </h1>
            <Box className="flex flex-col max-w-[600px]">
              <form onSubmit={handleSignup}>
                <Box className="flex flex-row gap-2 mb-2 !text-white">
                  <TextField
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1"
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
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1"
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
                </Box>
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
                    required
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
                    type="submit"
                  >
                    Create account.
                  </Button>
                </Box>
                {error && (
                  <Alert severity="error" className="mt-4">
                    {error}
                  </Alert>
                )}
                <p className="mt-2 text">
                  Already have an{" "}
                  <a className="text-[#5a3aab]" href="/login">
                    account?
                  </a>
                </p>
              </form>
            </Box>
          </Box>
        </Paper>
      )}
      {alertVisible && (
        <Alert severity="success" className="absolute top-5">
          Successfully registered account!
        </Alert>
      )}
    </Box>
  );
};

export default Signup;
