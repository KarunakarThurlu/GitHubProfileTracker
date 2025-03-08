import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Drilldown from "highcharts/modules/drilldown";
import { useThemeMode } from "./ThemeContext";

// Initialize Drilldown module
Drilldown(Highcharts);

const ChartUtil = ({ chartData }) => {
  const { darkMode } = useThemeMode(); // Theme context
  const [chartKey, setChartKey] = useState(0); // Force re-render on theme change

  useEffect(() => {
    // Apply the theme dynamically
    Highcharts.setOptions({
      chart: {
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        style: { color: darkMode ? "#ffffff" : "#000000" },
      },
      title: { style: { color: darkMode ? "#ffffff" : "#000000" } },
      xAxis: {
        labels: { style: { color: darkMode ? "#ffffff" : "#000000" } },
        lineColor: darkMode ? "#ffffff" : "#000000",
      },
      yAxis: {
        labels: { style: { color: darkMode ? "#ffffff" : "#000000" } },
        gridLineColor: darkMode ? "#444" : "#ddd",
      },
      legend: { itemStyle: { color: darkMode ? "#ffffff" : "#000000" } },
      drilldown: {
        breadcrumbs: {
          floating: false,
          position: { align: "left" },
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
    });

    // Override the breadcrumb text color
    Highcharts.SVGRenderer.prototype.symbols.breadcrumbs = function () {
      return {
        style: {
          fill: darkMode ? "#ffffff" : "#000000", // Force breadcrumb text color
        },
      };
    };

    // Force re-render
    setChartKey((prevKey) => prevKey + 1);
  }, [darkMode]);

  const options = {
    chart: { type: "column" },
    title: { text: "Repository Count by Language" },
    colors: ["#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0", "#0D47A1"],
    xAxis: { type: "category" },
    yAxis: {
      title: { text: "Repository Count" },
      gridLineWidth: 0, // Disable horizontal grid lines
    },
    legend: { enabled: false },
    series: [{ name: "Repository Count", colorByPoint: true, data: chartData?.seriesData || [] }],
    drilldown: {
      series: chartData?.drilldownSeries || [],
    },
    credits: { enabled: false },
  };

  return (
    <HighchartsReact
      key={chartKey} // Forces re-render when theme changes
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: "100%", height: "100%" } }}
    />
  );
};

export default ChartUtil;
