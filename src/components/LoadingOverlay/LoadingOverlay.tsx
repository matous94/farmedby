import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingOverlay(): JSX.Element {
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
