import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTotalTimeSpent } from "../../functions/fetchTotalTimeSpent";

const TotalTimeTracker = () => {
  const [totalTimeSpent, setTotalTimeSpent] = useState<string | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const fetchedTime: string = await fetchTotalTimeSpent();
        setTotalTimeSpent(fetchedTime);
      } catch (error) {
        console.error("Error fetching total time spent:", error);
      }
    };

    fetchTime();
  }, []);

  return (
    <Box className="w-full bg-zinc-800 text-white p-4 text-center rounded-md">
      <Typography>
        Total time spent: {totalTimeSpent ?? "Loading..."}
      </Typography>
    </Box>
  );
};

export default TotalTimeTracker;
