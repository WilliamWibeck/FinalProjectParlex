import { Box, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchTotalTimeSpent } from "../../functions/fetchTotalTimeSpent";

const db = getFirestore();
const auth = getAuth();

const TotalTimeTracker = () => {
  const [totalTimeSpent, setTotalTimeSpent] = useState<string>();

  useEffect(() => {
    const fetchTime = async () => {
      const fetchedTime = await fetchTotalTimeSpent();
      setTotalTimeSpent(fetchedTime);
    };
    fetchTime();
  }, []);

  return (
    <Box className="w-full bg-zinc-800 text-white p-4 text-center rounded-md">
      <Typography>
        Total time spent: {totalTimeSpent ? totalTimeSpent : "Loading..."}
      </Typography>
    </Box>
  );
};

export default TotalTimeTracker;
