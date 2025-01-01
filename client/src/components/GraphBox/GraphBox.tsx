import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Paper } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Height } from "@mui/icons-material";

const auth = getAuth();
const db = getFirestore();

const combineData = (words, sentences, wordOrders) => {
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
  const [combinedData, setCombinedData] = useState([]);

  const getSnapshot = async () => {
    if (user) {
      const userRef = doc(db, "user_progress", user.uid);
      const snapshot = await getDoc(userRef);
      const snapshotdata = snapshot.data();
      console.log("Raw Firestore Data:", snapshotdata);

      const wordsByDate = snapshotdata?.wordsByDate || {};
      const sentencesByDate = snapshotdata?.sentencesByDate || {};
      const wordOrderByDate = snapshotdata?.wordOrderByDate || {};

      const parseDateKey = (dateKey) => {
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
      console.log("Merged Data Before Filtering:", mergedData);

      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const filteredData = mergedData.filter((entry) => {
        const entryDate = new Date(entry.date);
        console.log(
          `Entry: ${entry.date}, Parsed Entry: ${entryDate}, Last 7 Days: ${last7Days}`
        );
        return entryDate >= last7Days;
      });

      console.log("Filtered Data:", filteredData);

      setCombinedData(
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    }
  };

  useEffect(() => {
    getSnapshot();
  }, []);

  const dates = combinedData.map((entry) => entry.date);
  const wordsData = combinedData.map((entry) => entry.wordsDone);
  const sentencesData = combinedData.map((entry) => entry.sentencesDone);
  const wordOrderData = combinedData.map((entry) => entry.wordOrderDone);

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
      axisBorder: {
        color: "#555770",
      },
      axisTicks: {
        color: "#555770",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
      title: {
        text: "Count",
        style: {
          color: "#FFFFFF",
        },
      },
      axisBorder: {
        color: "#555770",
      },
      axisTicks: {
        color: "#555770",
      },
    },
    colors: ["#00FF00", "#0284c7", "#6B46C1"],
    grid: {
      borderColor: "#555770",
    },
    legend: {
      labels: {
        colors: "#FFFFFF",
      },
    },
    tooltip: {
      theme: "dark",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
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
