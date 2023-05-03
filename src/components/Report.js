// import React from "react";
import { useCubeQuery } from "@cubejs-client/react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

function Report() {
  // isLoading, error, progress
  const [drillDownQuery, setDrillDownQuery] = useState();
  const { resultSet } = useCubeQuery({
    measures: ["orders.count"],
    dimensions: ["orders.created_at"],
    limit: 30,
    filters: [
      {
        member: "orders.count",
        operator: "gt",
        values: ["0"],
      },
    ],
  });

  if (!resultSet) {
    return <p>Loading...</p>;
  }

  const handleBarClick = (event, yValues) => {
    if (event.xValues != null) {
      setDrillDownQuery(
        resultSet.drillDown({
          xValues: event.xValues,
          yValues,
        })
      );
    }
  };

  // defined dimensions will be assigned to `x` key from resultSet.chartPivot
  // measures can be accessed out from `seriesNames`

  // LOG DRILLDOWN QUERY
  console.log(drillDownQuery);
  return (
    <>
      <p>Bar Chart</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={resultSet.chartPivot()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <RechartsTooltip />
          <Legend />

          {resultSet.seriesNames().map(({ key, yValues }) => {
            return (
              <Bar
                key={key}
                stackId="a"
                dataKey={key}
                fill={"#fcb953"}
                onClick={(event) => handleBarClick(event, yValues)}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Report;
