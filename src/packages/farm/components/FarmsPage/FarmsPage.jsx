import * as React from "react";
import Box from "@material-ui/core/Box";

import ApiClient from "src/packages/api-client";
import { useAsync } from "src/packages/hooks";
import AppBar from "src/components/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "src/components/Link";

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
      <Box p="24px" width="700px" mx="auto">
        {farmGetter.isLoading && <h1>Loading</h1>}
        {farmGetter.isResolved &&
          farmGetter.result.map((farm) => (
            <Box mb="32px" key={farm.objectId}>
              <Link to={`/farm/${farm.objectId}`}>{farm.name}</Link>
              <pre style={{ maxWidth: "800px", whiteSpace: "pre-line" }}>
                {JSON.stringify(farm, null, 2)}
              </pre>
            </Box>
          ))}
      </Box>
    </>
  );
}
