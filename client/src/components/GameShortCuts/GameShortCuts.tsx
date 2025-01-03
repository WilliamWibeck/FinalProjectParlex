import { Box, Paper, Typography } from "@mui/material";

const GameShortCuts = () => {
  return (
    <Box className="flex flex-col items-center h-full w-full">
      <Typography className="text-white">
        Continue where you left off!
      </Typography>
      <Box className="flex flex-row gap-8 ">
        <Paper className="h-full w-full text-center !bg-zinc-800  flex items-center justify-center">
          <Typography className="text-white">Vocabulary exercise</Typography>
        </Paper>
        <Paper className="h-full w-full text-center !bg-zinc-800  flex items-center justify-center">
          <Typography className="text-white">Complete sentence</Typography>
        </Paper>
        <Paper className="h-full w-full text-center !bg-zinc-800  flex items-center justify-center">
          <Typography className="text-white">Un / Une</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default GameShortCuts;
