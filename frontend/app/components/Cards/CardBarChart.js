"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function CardBarChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          barPercentage: 0.6,
          categoryPercentage: 0.5
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "rgba(0,0,0,.4)",
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              color: "rgba(33, 37, 41, 0.3)",
            },
          },
          y: {
            display: true,
            grid: {
              color: "rgba(33, 37, 41, 0.2)",
            },
            beginAtZero: true
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]); // Add data as dependency

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Performance
            </h6>
            <h2 className="text-blueGray-700 text-xl font-semibold">
              Total orders
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-[350px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}