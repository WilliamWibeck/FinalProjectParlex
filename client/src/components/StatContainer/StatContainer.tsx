import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchAccuracy } from "../../functions/fetchAccuracy";

const StatContainer = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accuracy = await fetchAccuracy();
        setStats(accuracy);
      } catch (error) {
        console.error("Error fetching accuracy data:", error);
      }
    };

    fetchData();
  }, []);

  const shortenedFlashcardAccuracy = Math.min(
    Math.max(Number(stats?.flashCardAccuracy || 0), 0),
    100
  );
  const shortenedCompleteSentenceAccuracy = Math.min(
    Math.max(Number(stats?.completeSentenceAccuracy || 0), 0),
    100
  );
  const shortenedWordOrderAccuracy = Math.min(
    Math.max(Number(stats?.wordOrderAccuracy || 0), 0),
    100
  );

  const getChartOptions = (label: string, color: string) => ({
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "80%",
        },

        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            color: "#6b46c1",
          },
          value: {
            show: true,
            fontSize: "22px",
            color: "white",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    colors: [color],
    labels: [label],
  });

  return (
    <div className="bg-zinc-800 p-5 flex justify-center items-center w-full rounded-md">
      <div className="flex justify-evenly items-center gap-5">
        <div className="text-center w-48">
          <ReactApexChart
            options={getChartOptions("Vocabulary", "#6b46c1")}
            series={[shortenedFlashcardAccuracy]}
            type="radialBar"
            height={400}
          />
        </div>

        <div className="text-center w-48">
          <ReactApexChart
            options={getChartOptions("Un/Une?", "#6b46c1")}
            series={[shortenedCompleteSentenceAccuracy]}
            type="radialBar"
            height={250}
          />
        </div>

        <div className="text-center w-48">
          <ReactApexChart
            options={getChartOptions("Shuffled Sentences", "#6b46c1")}
            series={[shortenedWordOrderAccuracy]}
            type="radialBar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default StatContainer;
