import * as React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "src/components/Link";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100vw",
        pt: ["24px", "32px"],
        pb: ["16px", "24px"],
        px: ["16px", "24px", "32px"],
        background: (theme) => theme.palette.secondary.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "auto",
        color: (theme) => theme.palette.secondary.contrastText
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: ["column", "row", "row"],
          textAlign: ["center", "left", "left"]
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", null, "row"],
            mr: [null, "22px", "24px"]
          }}
        >
          <Link sx={{ mr: [null, null, "32px"] }} to="/privacy-policy">
            Obchodní podmínky
          </Link>
          <Link to="/privacy-policy">Podmínky prodejce</Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", null, "row"],
            ml: [null, "22px", 0]
          }}
        >
          <Link sx={{ mr: [null, null, "32px"] }} to="/privacy-policy">
            Ochrana osobních údajů
          </Link>
          <Link to="/privacy-policy">Reklamace</Link>
        </Box>
      </Box>
      <Typography sx={{ mt: "12px" }}>© 2021 FarmedBy.com</Typography>
    </Box>
  );
}
