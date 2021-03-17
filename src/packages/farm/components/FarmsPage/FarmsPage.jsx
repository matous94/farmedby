import * as React from "react";
import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import AppBar from "src/components/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function FarmsPage() {
  const farmGetter = useAsync(
    () => {
      return ApiClient.Farm.getFarms();
    },
    { runOnMount: true, functionName: "getFarms" }
  );

  return (
    <>
      <AppBar />
      <Toolbar />
      {farmGetter.isLoading && <h1>Loading</h1>}
      {farmGetter.isResolved && (
        <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
          {JSON.stringify(farmGetter.result, null, 2)}
        </pre>
      )}
    </>
  );
}
