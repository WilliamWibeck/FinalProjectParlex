import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const AccuracyGraph = () => {
  const [viewMode, setViewMode] = useState(30);
  const [categories, setCategories] = useState([]);
  const [accuracySeries, setAccuracySeries] = useState([]);

  const fetchAccuracyData = async (days: string) => {
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, "user_progress", user.uid);
      const userDoc = await getDoc(userRef);

      const data = userDoc.data();
      if (!data) return;

      const wordsByDate = data?.wordsByDate || {};
      const sentencesByDate = data?.sentencesByDate || {};
      const wordOrderByDate = data?.wordOrderByDate || {};
      const incorrectGuessesByDate = data?.incorrectGuessesByDate || {};

      const today = new Date();
      const lastNDays = [...Array(days)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split("T")[0].replace(/-/g, "");
      });

      const dailyAccuracy = lastNDays.map((date) => {
        const correctGuesses =
          (wordsByDate[date] || 0) +
          (sentencesByDate[date] || 0) +
          (wordOrderByDate[date] || 0);

        const incorrectGuesses =
          (incorrectGuessesByDate[date]?.completeSentence || 0) +
          (incorrectGuessesByDate[date]?.wordorder || 0);

        const totalGuesses = correctGuesses + incorrectGuesses;

        return totalGuesses > 0
          ? ((correctGuesses / totalGuesses) * 100).toFixed(2)
          : 0;
      });

      setCategories(lastNDays.reverse());
      setAccuracySeries(dailyAccuracy.reverse());
    }
  };

  useEffect(() => {
    fetchAccuracyData(viewMode);
  }, [viewMode]);

  const chartOptions = {
    chart: {
      type: "line",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "white",
        },
      },
      tickAmount: viewMode === 7 ? 7 : 4,
    },
    yaxis: {
      labels: {
        style: {
          colors: "white",
        },
      },
      title: {
        text: "Accuracy (%)",
        style: {
          color: "white",
        },
      },
      min: 0,
      max: 100,
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#6b46c1"],
  };

  const chartSeries = [
    {
      name: "Accuracy",
      data: accuracySeries,
    },
  ];

  return (
    <div className="bg-zinc-800 p-5 rounded-md">
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            viewMode === 7
              ? "bg-[#6b46c1] text-white"
              : "bg-zinc-700 text-white"
          }`}
          onClick={() => setViewMode(7)}
        >
          Last 7 Days
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewMode === 30
              ? "bg-[#6b46c1] text-white"
              : "bg-zinc-700 text-white"
          }`}
          onClick={() => setViewMode(30)}
        >
          Last 30 Days
        </button>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={400}
      />
    </div>
  );
};

export default AccuracyGraph;
