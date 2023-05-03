import { useCubeQuery } from "@cubejs-client/react";
// ...

function Report() {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["orders.count"],
  });
  console.log(resultSet.tablePivot());
  return <p>Hello</p>;
}

export default Report;
