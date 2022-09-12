import { Card, CardBody, CardTitleWrapper } from "../ui/Card/Card.styled";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FC } from "react";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart: FC<{
   positive: number;
   negative: number;
   totalUndefined: number;
}> = ({ positive, negative, totalUndefined }) => {
   const total = positive + negative + totalUndefined;
   const data = {
      labels: ["Positive", "Negative", "Undefined"],
      datasets: [
         {
            label: "# of Votes",
            data: [positive, negative, totalUndefined],
            backgroundColor: [
               "rgba(255, 99, 132, 0.2)",
               "rgba(54, 162, 235, 0.2)",
               "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };
   return (
      <Card style={{ overflow: "hidden" }}>
         <CardTitleWrapper>
            <h1>Total commnets</h1>
         </CardTitleWrapper>
         <CardBody style={{ position: "relative" }}>
            <Pie
               data={data}
               redraw={true}
               height={250}
               options={{
                  maintainAspectRatio: false,
                  interaction: {
                     intersect: false,
                     mode: "index",
                  },
                  plugins: {
                     tooltip: {
                        callbacks: {
                           label: (tooltipItems) => {
                              const val = (tooltipItems.parsed / total) * 100;
                              return `${
                                 tooltipItems.label
                              } comments: ${val.toFixed(2)}% (${
                                 tooltipItems.parsed
                              })`;
                           },
                        },
                     },
                  },
               }}
            />
         </CardBody>
      </Card>
   );
};

export default PieChart;
