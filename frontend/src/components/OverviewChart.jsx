import React from "react";
import produce from "immer";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data: sales } = useQuery({
    queryKey: "sales",
    queryFn: async () => {
      const { data } = await axios.get("/sales/sales");
      return data;
    },
  });
  console.log("🚀 ~ file: OverviewChart.jsx:16 ~ OverviewChart ~ sales", sales);
  const [totalSalesLine, totalUnitsLine] = React.useMemo(() => {
    if (!sales) return [];
    const { monthlyData } = sales;
    let totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.secondary.main,
      data: [],
    };
    let totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.secondary[600],
      data: [],
    };
    Object.values(monthlyData).reduce(
      (acc, curr) => {
        const { month, totalSales, totalUnits } = curr;
        let currSales = totalSales + acc.totalSales;
        let currUnits = totalUnits + acc.totalUnits;

        totalSalesLine = produce(totalSalesLine, (draft) => {
          draft.data.push({ x: month, y: currSales });
        });

        totalUnitsLine = produce(totalUnitsLine, (draft) => {
          draft.data.push({ x: month, y: currUnits });
        });
        return { totalSales: currSales, totalUnits: currUnits };
      },
      { totalUnits: 0, totalSales: 0 }
    );
    return [[totalSalesLine], [totalUnitsLine]];
  }, [sales]);

  if (!sales) return;
  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
