import { Box } from "@mui/material";

const BlurryBackground = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#121212",
        zIndex: "-1000",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #8d1fe7, transparent)",
          borderRadius: "50%",
          animation: "move1 10s ease-in-out infinite",
          "@keyframes move1": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(50px, 20px)" },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "30%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #8d1fe7, transparent)",
          filter: "blur(120px)",
          animation: "move2 12s ease-in-out infinite",
          "@keyframes move2": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(-100px, -40px)" },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, #8d1fe7, transparent)",
          filter: "blur(100px)",
          animation: "move3 15s ease-in-out infinite",
          "@keyframes move3": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(60px, -30px)" },
          },
        }}
      />
    </Box>
  );
};

export default BlurryBackground;
