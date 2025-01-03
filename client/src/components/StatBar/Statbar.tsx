import { Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTotalWords } from "../../functions/fetchTotalWords";
import { fetchTotalSentences } from "../../functions/fetchTotalSentences";
import { fetchTotalWordOrder } from "../../functions/fetchTotalWordOrder";

const Statbar = () => {
  const [totalWordsDone, setTotalWordsDone] = useState<number[]>();
  const [totalSentencesDone, setTotalSentencesDone] = useState<number[]>();
  const [totalWordOrderDone, setTotalWordOrderDone] = useState<number[]>();

  useEffect(() => {
    const fetchWordsDone = async () => {
      const fetchedWords = await fetchTotalWords();

      setTotalWordsDone(fetchedWords);
    };
    fetchWordsDone();
    const fetchSentencesDone = async () => {
      const fetchedSentences = await fetchTotalSentences();

      setTotalSentencesDone(fetchedSentences);
    };
    fetchSentencesDone();
    const fetchWordOrderDone = async () => {
      const fetchedWordOrder = await fetchTotalWordOrder();

      setTotalWordOrderDone(fetchedWordOrder);
    };
    fetchWordOrderDone();
  });

  return (
    <Paper className="!bg-zinc-800 p-1">
      <Stack
        direction="row"
        className="flex items-center text-white justify-evenly p-2"
      >
        <Typography>Words completed: {totalWordsDone}</Typography>

        <Typography>Sentences completed: {totalSentencesDone}</Typography>

        <Typography>Un/Une completed: {totalWordOrderDone}</Typography>
      </Stack>
    </Paper>
  );
};

export default Statbar;
