import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        top: "0",
        left: "0",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: (theme) => theme.zIndex.appBar + 1
      }}
    >
      <CircularProgress />
    </Box>
  );
}
