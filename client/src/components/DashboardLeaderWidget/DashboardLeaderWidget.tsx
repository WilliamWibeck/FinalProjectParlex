import React, { useEffect, useState } from "react";
import { fetchAllUserStats } from "../../functions/fetchAllUserStats";
import { Box, Divider } from "@mui/material";

type Props = {};

const DashboardLeaderWidget = (props: Props) => {
  const [wordLeaders, setWordLeaders] = useState([]);
  const [sentenceLeaders, setSentenceLeaders] = useState([]);
  const [wordOrderLeaders, setWordOrderLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const fullStats = await fetchAllUserStats();

      const sortedWordLeaders = fullStats
        .sort((a, b) => b.wordsLearned - a.wordsLearned)
        .slice(0, 5);
      const sortedSentenceLeaders = fullStats
        .sort((a, b) => b.sentencesCompleted - a.sentencesCompleted)
        .slice(0, 5);
      const sortedWordOrderLeaders = fullStats
        .sort((a, b) => b.wordOrderCompleted - a.wordOrderCompleted)
        .slice(0, 5);

      setWordLeaders(sortedWordLeaders);
      setSentenceLeaders(sortedSentenceLeaders);
      setWordOrderLeaders(sortedWordOrderLeaders);
    };

    fetchLeaders();
  }, []);

  return (
    <Box className="bg-zinc-800 flex flex-row p-4 rounded-md justify-between shadow-md text-white w-full border-2 border-[#6b46c1]">
      <Box>
        <h4 className="text-md font-semibold ">Most Words Completed</h4>
        <ul className="mt-2">
          {wordLeaders.map((user, index) => (
            <li key={user.id} className="mb-2">
              {index + 1}. {user.firstName} {user.lastName} -{" "}
              {user.wordsLearned} words
            </li>
          ))}
        </ul>
      </Box>

      <Divider className="bg-white my-4" />

      <Box>
        <h4 className="text-md font-semibold">Most Sentences Completed</h4>
        <ul className="mt-2">
          <Divider />
          {sentenceLeaders.map((user, index) => (
            <li key={user.id} className="mb-2">
              {index + 1}. {user.firstName} {user.lastName} -{" "}
              {user.sentencesCompleted} sentences
            </li>
          ))}
        </ul>
      </Box>

      <Divider className="bg-white my-4" />

      <Box>
        <h4 className="text-md font-semibold">Most Word Orders Completed</h4>
        <ul className="mt-2">
          {wordOrderLeaders.map((user, index) => (
            <li key={user.id} className="mb-2">
              {index + 1}. {user.firstName} {user.lastName} -{" "}
              {user.wordOrderCompleted} word orders
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default DashboardLeaderWidget;
