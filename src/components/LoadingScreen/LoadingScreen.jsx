import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import AppBar from "src/components/AppBar";

export default function LoadingScreen() {
  return (
    <>
      <AppBar onlyLogo={true} />
      <Box
        position="absolute"
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    </>
  );
}
