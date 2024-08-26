import React, { useContext, useEffect, useRef } from "react";
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Drilldown from 'highcharts/modules/drilldown';

// Initialize necessary modules
Drilldown(Highcharts);

const ChartUtil = ({ chartData }) => {


    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Repository Count by Language'
        },
        colors: [
            '#64B5F6', 
            '#42A5F5', 
            '#2196F3',
            '#1E88E5', 
            '#1976D2', 
            '#1565C0',
            '#0D47A1'  
            ],
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Repository Count'
            },
            gridLineWidth: 0  // Disable horizontal grid lines
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Repository Count',
            colorByPoint: true,
            data: chartData?.seriesData || []
        }],
        drilldown: {
            series: chartData?.drilldownSeries || []
        },
        credits: {
            enabled: false
        }
    }


    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { width: '100%', height: '100%' } }}
        />
    )

}
export default ChartUtil;