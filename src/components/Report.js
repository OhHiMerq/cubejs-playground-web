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

  const { resultSet: ddResultSet } = useCubeQuery(drillDownQuery, {
    skip: !drillDownQuery,
  });

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

  // LOG DRILLDOWN QUERY
  console.log(drillDownQuery);
  return (
    <>
      <p>Bar Chart</p>
      {resultSet && (
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
      )}
      {ddResultSet && (
        <table>
          <tr>
            {ddResultSet.tableColumns().map((d) => (
              <th>{d.title}</th>
            ))}
          </tr>
          {Object.keys(ddResultSet.tablePivot()).map((d) => (
            <tr>
              {Object.values(ddResultSet.tablePivot()[d]).map((v) => (
                <td>{v}</td>
              ))}
            </tr>
          ))}
        </table>
      )}
    </>
  );
}

export default Report;
