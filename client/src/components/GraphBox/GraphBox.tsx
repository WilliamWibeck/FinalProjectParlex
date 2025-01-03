import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Paper } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

interface Data {
  date: string;
  wordsDone: number;
  sentencesDone: number;
  wordOrderDone: number;
}

//Här kombineras data från words, sentences och wordOrders
export const combineData = (
  words: { date: string; wordsDone: number }[],
  sentences: { date: string; sentencesDone: number }[],
  wordOrders: { date: string; wordOrderDone: number }[]
): Data[] => {
  return words.map((wordEntry) => {
    const matchingSentence = sentences.find(
      (sentenceEntry) => sentenceEntry.date === wordEntry.date
    );
    const matchingWordOrder = wordOrders.find(
      (wordOrderEntry) => wordOrderEntry.date === wordEntry.date
    );

    return {
      ...wordEntry,
      sentencesDone: matchingSentence ? matchingSentence.sentencesDone : 0,
      wordOrderDone: matchingWordOrder ? matchingWordOrder.wordOrderDone : 0,
    };
  });
};

const GraphBox = () => {
  const user = auth.currentUser;
  const [combinedData, setCombinedData] = useState<Data[]>([]);

  //Här hämtas data från 'user_progress' dokumentet i Firestore. Datan sätts sen in i olika listor och konverteras till listor med datum och värden.
  const getSnapshot = async (): Promise<void> => {
    if (user) {
      const userRef = doc(db, "user_progress", user.uid);
      const snapshot = await getDoc(userRef);
      const snapshotdata = snapshot.data();

      const wordsByDate = snapshotdata?.wordsByDate || {};
      const sentencesByDate = snapshotdata?.sentencesByDate || {};
      const wordOrderByDate = snapshotdata?.wordOrderByDate || {};

      const parseDateKey = (dateKey: string) => {
        const year = dateKey.slice(0, 4);
        const month = dateKey.slice(4, 6);
        const day = dateKey.slice(6, 8);
        return `${year}-${month}-${day}`;
      };

      const wordsArray = Object.entries(wordsByDate).map(
        ([dateKey, wordsDone]) => ({
          date: parseDateKey(dateKey),
          wordsDone: Number(wordsDone),
        })
      );

      const sentencesArray = Object.entries(sentencesByDate).map(
        ([dateKey, sentencesDone]) => ({
          date: parseDateKey(dateKey),
          sentencesDone: Number(sentencesDone),
        })
      );

      const wordOrderArray = Object.entries(wordOrderByDate).map(
        ([dateKey, wordOrderDone]) => ({
          date: parseDateKey(dateKey),
          wordOrderDone: Number(wordOrderDone),
        })
      );

      const mergedData = combineData(
        wordsArray,
        sentencesArray,
        wordOrderArray
      );

      //Här filtreras data för att endast visa de senaste 7 dagarna.
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const filteredData = mergedData.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= last7Days;
      });

      //Här sorteras datan i stigande ordning baserat på datum
      setCombinedData(
        filteredData.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        })
      );
    }
  };

  useEffect(() => {
    getSnapshot();
  }, []);

  //Den kombinerade datan delas upp för att skapa serier till grafen.
  const dates = combinedData.map((entry) => entry.date);
  const wordsData = combinedData.map((entry) => entry.wordsDone);
  const sentencesData = combinedData.map((entry) => entry.sentencesDone);
  const wordOrderData = combinedData.map((entry) => entry.wordOrderDone);

  //Inställningar för grafen
  const chartOptions = {
    chart: {
      type: "bar",
      stacked: false,
      background: "#27272a",
      foreColor: "#FFFFFF",
    },
    xaxis: {
      categories: dates,
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          color: "#FFFFFF",
        },
      },
    },
    colors: ["#00FF00", "#0284c7", "#6B46C1"],
    tooltip: {
      theme: "dark",
    },
  };

  const chartSeries = [
    {
      name: "Words Done",
      data: wordsData,
    },
    {
      name: "Un/Une Done",
      data: sentencesData,
    },
    {
      name: "Shuffled sentences Done",
      data: wordOrderData,
    },
  ];

  return (
    <Paper className="!text-white !bg-zinc-800 flex items-center justify-center w-full h-full">
      {combinedData.length === 0 ? (
        <Paper className="!text-white !bg-zinc-800 flex items-center justify-center h-[100%] w-full">
          <p>Loading data...</p>
        </Paper>
      ) : (
        <div className="w-full h-[100%]">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="100%"
            width="100%"
          />
        </div>
      )}
    </Paper>
  );
};

export default GraphBox;
