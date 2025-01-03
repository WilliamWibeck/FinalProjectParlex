import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import TailwindParticles from "../TailwindParticles/TailwindParticles";

interface IntroPageProps {
  handleIntroShown: (shown: boolean) => void;
}

const IntroPage = ({ handleIntroShown }: IntroPageProps) => {
  const [introShown, setIntroShown] = useState<boolean>(false);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [boxVisible, setBoxVisible] = useState<boolean>(true);

  const handleIntro = () => {
    setIntroShown(true);
    handleIntroShown(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => {
    setBoxVisible(false);

    setTimeout(() => {
      handleIntro();
    }, 2000);
  };

  //Här används biblioteket 'ReactTyped' för att få en skrivmaskins effekt på välkomsttexten.

  return (
    <Box
      className={`h-screen w-screen bg-zinc-900 flex flex-col items-center justify-center transition-opacity duration-1000 gap-8 ${
        boxVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <TailwindParticles />
      <Box className="text-5xl text-white flex flex-col gap-10">
        <ReactTyped strings={["Welcome to Parlex"]} typeSpeed={100} />
      </Box>

      <Button
        variant="outlined"
        className={`transition-opacity duration-1000 ease-in-out ${
          buttonVisible ? "opacity-100 visible" : "opacity-0 invisible"
        } mt-5`}
        onClick={handleNavigate}
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
        Get started
      </Button>
    </Box>
  );
};

export default IntroPage;
