import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Header from "../../components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../geoData";
import { Box, useTheme } from "@mui/material";

const Geography = () => {
  const theme = useTheme();
  const { data: geography, isLoading } = useQuery({
    queryKey: ["geography"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get("/client/geography");
      return response.data;
    },
  });
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Geography"
        subtitle={"Find where your users are located"}
      />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {!isLoading && (
          <ResponsiveChoropleth
            data={geography}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            colors="nivo"
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.45, 0.6]}
            projectionScale={150}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={1.3}
            borderColor="#ffffff"
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
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default Geography;
