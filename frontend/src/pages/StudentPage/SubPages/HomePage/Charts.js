import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

export default function Charts() {
  const info = useSelector((state) => state.info.avg_grades) || [];
  const [data, setData] = useState([]);

  useEffect(() => {
    if (info.length !== data.length) {
      setData(info);
    }
  }, [info]);

  const seriesData = data.map((subject) => subject.avg);
  const labelsData = data.map((subject) => subject.name);
  console.log(seriesData, labelsData);

  const series = [
    {
      name: "Przedmioty",
      data: seriesData,
    },
  ];

  const options = {
    chart: {
      id: "basic-bar",
      width: "100%",
    },
    xaxis: {
      categories: labelsData,
    },
    responsive: [
      {
        breakpoint: 1000,
        options: { chart: { width: "100%" } },
      },
    ],
  };

  return (
    <div className="studenthome__charts">
      <h3>Obecna średnia z ocen</h3>
      <div className="studenthome__charts-chart">
        {data.length > 0 ? (
          <Chart options={options} series={series} type="bar" height={"100%"} />
        ) : (
          <div className="loading"></div>
        )}
      </div>
    </div>
  );
}
