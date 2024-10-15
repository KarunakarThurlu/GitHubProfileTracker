import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Dashboards from '@highcharts/dashboards';
import '@highcharts/dashboards/css/dashboards.css'; // Import the dashboard styles

const CustomDashBoard = () => {
  useEffect(() => {
    // Initialize Highcharts Dashboards after the DOM has been rendered
    const dashboard = Dashboards.board('dashboard-container', {
      dataPool: {
        connectors: [
          {
            id: 'micro-element',
            type: 'JSON',
            options: {
              firstRowAsNames: false,
              columnNames: ['Food', 'Vitamin A', 'Iron'],
              data: [
                ['Beef Liver', 6421, 6.5],
                ['Lamb Liver', 2122, 6.5],
                ['Cod Liver Oil', 1350, 0.9],
                ['Mackerel', 388, 1],
                ['Tuna', 214, 0.6],
              ],
            },
          },
        ],
      },
      gui: {
        layouts: [
          {
            rows: [
              {
                cells: [
                  {
                    id: 'kpi-section',
                    layout: {
                      rows: [
                        {
                          cells: [
                            {
                              id: 'kpi-vitamin-a',
                            },
                            {
                              id: 'kpi-iron',
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
              {
                cells: [
                  {
                    id: 'chart-col-1',
                  },
                  {
                    id: 'chart-col-2',
                  },
                ],
              },
              {
                cells: [
                  {
                    id: 'datagrid-section',
                  },
                ],
              },
            ],
          },
        ],
      },
      components: [
        {
          type: 'KPI',
          renderTo: 'kpi-vitamin-a',
          value: 900,
          valueFormat: '{value} mcg',
          title: 'Vitamin A',
          subtitle: 'Daily recommended dose',
        },
        {
          type: 'KPI',
          renderTo: 'kpi-iron',
          value: 8,
          valueFormat: '{value} mg',
          title: 'Iron',
          subtitle: 'Daily recommended dose',
        },
        {
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          connector: {
            id: 'micro-element',
            columnAssignment: [
              {
                seriesId: 'Vitamin A',
                data: ['Food', 'Vitamin A'],
              },
            ],
          },
          renderTo: 'chart-col-1',
          type: 'Highcharts',
          chartOptions: {
            chart: {
              type: 'column',
              spacing: [30, 30, 30, 30],
            },
            title: {
              text: 'Vitamin A in Food',
            },
            xAxis: {
              type: 'category',
              title: {
                text: 'Food',
              },
            },
            yAxis: {
              title: {
                text: 'Vitamin A (mcg)',
              },
              plotLines: [
                {
                  value: 900,
                  dashStyle: 'shortDash',
                  label: {
                    text: 'RDA',
                    align: 'right',
                    style: {
                      color: '#B73C28',
                    },
                  },
                },
              ],
            },
            series: [
              {
                name: 'Vitamin A',
                data: [
                  ['Beef Liver', 6421],
                  ['Lamb Liver', 2122],
                  ['Cod Liver Oil', 1350],
                  ['Mackerel', 388],
                  ['Tuna', 214],
                ],
              },
            ],
          },
        },
        {
          sync: {
            visibility: true,
            highlight: true,
            extremes: true,
          },
          connector: {
            id: 'micro-element',
            columnAssignment: [
              {
                seriesId: 'Iron',
                data: ['Food', 'Iron'],
              },
            ],
          },
          renderTo: 'chart-col-2',
          type: 'Highcharts',
          chartOptions: {
            chart: {
              type: 'column',
              spacing: [30, 30, 30, 30],
            },
            title: {
              text: 'Iron in Food',
            },
            xAxis: {
              type: 'category',
              title: {
                text: 'Food',
              },
            },
            yAxis: {
              title: {
                text: 'Iron (mg)',
              },
              plotLines: [
                {
                  value: 8,
                  dashStyle: 'shortDash',
                  label: {
                    text: 'RDA',
                    align: 'right',
                    style: {
                      color: '#B73C28',
                    },
                  },
                },
              ],
            },
            series: [
              {
                name: 'Iron',
                data: [
                  ['Beef Liver', 6.5],
                  ['Lamb Liver', 6.5],
                  ['Cod Liver Oil', 0.9],
                  ['Mackerel', 1],
                  ['Tuna', 0.6],
                ],
              },
            ],
          },
        },
        {
          renderTo: 'datagrid-section',
          connector: {
            id: 'micro-element',
          },
          type: 'DataGrid',
          sync: {
            highlight: true,
            visibility: true,
          },
        },
      ],
    });

    // Cleanup dashboard on component unmount
    return () => {
      if (dashboard) {
        dashboard.destroy();
      }
    };
  }, []);

  return (
    <div id="dashboard-container" style={{ width: '100%', height: '100vh' }}>
      {/* The necessary container for rendering */}
      <div id="kpi-section">
        <div id="kpi-vitamin-a"></div>
        <div id="kpi-iron"></div>
      </div>
      <div id="chart-col-1"></div>
      <div id="chart-col-2"></div>
      <div id="datagrid-section"></div>
    </div>
  );
};

export default CustomDashBoard;
