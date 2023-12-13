import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  TooltipItem,
} from "chart.js";
interface LineChartData {
  date: string;
  income: number;
  totalCompletadas: number;
  totalPendientes: number;
}

interface LineChartProps {
  data: LineChartData[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Ingresos por día",
        data: data.map((d) => d.income),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += `$${context.raw}`;
            const dayData = data[context.dataIndex];
            return [
              label,
              `Reservas Completadas: ${dayData.totalCompletadas}`,
              `Reservas Pendientes: ${dayData.totalPendientes}`,
            ];
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
