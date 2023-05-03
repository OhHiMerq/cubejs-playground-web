import { CubeProvider } from "@cubejs-client/react";
import cubejs from "@cubejs-client/core";
import Report from "./components/Report";
import "./App.css";

function App() {
  const cubejsApi = cubejs("token", {
    apiUrl: "http://localhost:4000/cubejs-api/v1",
  });

  return (
    <div className="App">
      <CubeProvider cubejsApi={cubejsApi}>
        <Report />
      </CubeProvider>
    </div>
  );
}

export default App;
