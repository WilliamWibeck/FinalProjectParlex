import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const AccuracyGraph = () => {
  const [daySwitcher, setDaySwitcher] = useState<number>(30); //state för att switcha mellan 7 och 30 dagars statistik
  const [categories, setCategories] = useState<string[]>([]);
  const [accuracySeries, setAccuracySeries] = useState<number[]>([]);

  const fetchAccuracyData = async (days: number) => {
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
      //Skapar en lista med senaste dagarna samt formaterar till YYYYMMDD format.
      const lastXDays = [...Array(days)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split("T")[0].replace(/-/g, "");
      });

      //Räknar ut en daily accuracy genom att hämta antal korrekta och inkorrekta gissningar för varje dag och sedan dividerar.
      const dailyAccuracy: number[] = lastXDays.map((date): number => {
        const correctGuesses =
          (wordsByDate[date] || 0) +
          (sentencesByDate[date] || 0) +
          (wordOrderByDate[date] || 0);

        const incorrectGuesses =
          (incorrectGuessesByDate[date]?.completeSentence || 0) +
          (incorrectGuessesByDate[date]?.wordorder || 0) +
          (incorrectGuessesByDate[date]?.flashcards || 0);

        const totalGuesses = correctGuesses + incorrectGuesses;

        return totalGuesses > 0
          ? parseFloat(((correctGuesses / totalGuesses) * 100).toFixed(2))
          : 0;
      });
      setCategories(lastXDays.reverse());
      setAccuracySeries(dailyAccuracy.reverse());
    }
  };

  useEffect(() => {
    fetchAccuracyData(daySwitcher);
  }, [daySwitcher]);

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
      tickAmount: daySwitcher === 7 ? 7 : 4,
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
            daySwitcher === 7
              ? "bg-[#6b46c1] text-white"
              : "bg-zinc-700 text-white"
          }`}
          onClick={() => setDaySwitcher(7)}
        >
          Last 7 Days
        </button>
        <button
          className={`px-4 py-2 rounded ${
            daySwitcher === 30
              ? "bg-[#6b46c1] text-white"
              : "bg-zinc-700 text-white"
          }`}
          onClick={() => setDaySwitcher(30)}
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
