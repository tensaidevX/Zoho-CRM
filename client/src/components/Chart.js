import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import Styles from "../assets/css/chart.module.css"; //css
Chart.register(...registerables);

//Chart Component
const DynamicChart = (props) => {
  let [leadSources, setLeadSources] = useState([]);
  let [leadSourceValues, setleadSourceValues] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let sources = [];
    let dataset = [];

    for (let key in props.data) {
      sources.push(key);
      dataset.push(props.data[key]);
    }
    setLeadSources(sources);
    setleadSourceValues(dataset);
  }, [props.data]);

  useEffect(() => {
    // set data of chart
    setChartData({
      labels: leadSources,
      datasets: [
        {
          label: "Number of leads",
          data: leadSourceValues,
          backgroundColor: [
            "rgba(88, 24, 69)",
            "rgba(255, 195, 0,1)",
            "rgba(255, 87, 51,1)",
            "rgba(199, 0, 57,1)",
            "rgba(144, 12, 63,1)",
            "rgba(88, 24, 69,1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
          ],
          borderColor: [
            "rgba(218, 247, 166,1)",
            "rgba(255, 195, 0,1)",
            "rgba(255, 87, 51,1)",
            "rgba(199, 0, 57,1)",
            "rgba(144, 12, 63,1)",
            "rgba(88, 24, 69,1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [leadSourceValues, leadSources]);
  return (
    <div className={Styles.chartWrapper}>
      <h1>Top Lead Sources</h1>
      <div className={Styles.chart}>
        {chartData.datasets ? (
          //  bar component
          <Bar
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Top Lead Sources", display: true },
              scales: {
                yAxes: {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DynamicChart;
