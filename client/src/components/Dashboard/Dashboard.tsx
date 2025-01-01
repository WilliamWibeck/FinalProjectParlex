import { getAuth } from "firebase/auth";
import Box from "@mui/material/Box";
import Sidebar from "../Sidebar/Sidebar";
import Statbar from "../StatBar/Statbar";
import GraphBox from "../GraphBox/GraphBox";
import { useEffect, useState } from "react";
import { fetchMostUsedCategory } from "../../functions/fetchMostUsedCategory";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import StatContainer from "../StatContainer/StatContainer";

import { fetchTotalTimeSpent } from "../../functions/fetchTotalTimeSpent";
import AccuracyGraph from "../AccuracyGraph/AccuracyGraph";
import DashboardLeaderWidget from "../DashboardLeaderWidget/DashboardLeaderWidget";
import TotalTimeTracker from "../TotalTimeTracker/TotalTimeTracker";

const auth = getAuth();
const db = getFirestore();

const Dashboard = () => {
  const user = auth.currentUser;
  const [mostPractisedCategory, setMostPractisedCategory] = useState<
    string | null | undefined
  >();
  const [totalWordsTranslated, setTotalWordsTranslated] = useState();
  const [totalTimeSpent, setTotalTimeSpent] = useState();

  useEffect(() => {
    const fetchMostPractisedCategory = async () => {
      const category = await fetchMostUsedCategory();
      setMostPractisedCategory(category);
    };

    const fetchTimeSpent = async () => {
      const timeSpent = fetchTotalTimeSpent();
      setTotalTimeSpent(timeSpent);
    };

    fetchTimeSpent();
    fetchMostPractisedCategory();
    fetchTotalWordsTranslated();
  }, []);

  const fetchTotalWordsTranslated = async () => {
    if (user) {
      try {
        const userRef = doc(db, "user_progress", user.uid);
        const snapshot = await getDoc(userRef);
        const snapshotData = snapshot.data();
        const totalWordsDone = snapshotData?.wordsLearned;
        setTotalWordsTranslated(totalWordsDone);
      } catch {
        console.log("error");
      }
    }
  };

  return (
    <Box className="flex flex-row h-screen w-full  bg-zinc-900">
      <Sidebar />
      <Box className="h-full w-full flex items-center justify-center">
        <Box className="flex flex-row items-center justify-center h-[50%] w-[80%] gap-5  ">
          <Box className="flex flex-col gap-5 w-[70%] ">
            <StatContainer timeSpent={totalTimeSpent} />
            <Statbar />

            <AccuracyGraph />
          </Box>

          <Box className="w-[30%] h-[85%] flex items-center justify-center gap-4 flex-col ">
            <TotalTimeTracker />
            <GraphBox />
            <Box className="bg-zinc-800 w-full flex flex-col gap-2 p-2">
              <Box className="bg-zinc-800 border-2 border-[#6b46c1] text-white p-3 w-full text-center rounded-md text-2xl">
                Leaderboard
              </Box>
              <DashboardLeaderWidget />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
