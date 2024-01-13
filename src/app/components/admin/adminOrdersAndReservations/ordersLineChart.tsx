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

export interface OrderChartData {
  date: string;
  income: number;
  totalOrders: number;
}

interface OrdersLineChartProps {
  data: OrderChartData[];
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

const OrdersLineChart: React.FC<OrdersLineChartProps> = ({ data }) => {
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
            return [label, `Total Órdenes: ${dayData.totalOrders}`];
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default OrdersLineChart;
