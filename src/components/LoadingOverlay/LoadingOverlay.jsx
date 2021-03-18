import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core";

export default function LoadingOverlay() {
  const theme = useTheme();
  return (
    <Box
      top="0"
      left="0"
      position="fixed"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={theme.zIndex.drawer + 2}
    >
      <CircularProgress />
    </Box>
  );
}
