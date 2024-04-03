import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js/auto";
Chart.register(ArcElement);

function PieChart({ airplanes }) {
  const [airplaneData, setAirplaneData] = useState({
    labels: airplanes.map((airplane) => airplane.model + " " + airplane.type),
    datasets: [
      {
        label: "Capacity",
        data: airplanes.map((airplane) => airplane.capacity),
        backgroundcolor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    setAirplaneData({
      labels: airplanes.map((airplane) => airplane.model + " " + airplane.type),
      datasets: [
        {
          label: "Capacity",
          data: airplanes.map((airplane) => airplane.capacity),
        },
      ],
    });
  }, [airplanes]);
  return <Pie data={airplaneData} />;
}

export default PieChart;
