import React from "react";
import Box from "@mui/material/Box";
import Link from "src/components/Link";

export default function ErrorPage() {
  return (
    <Box sx={{ p: "32px" }}>
      <h1>Něco se porouchalo. Zkuste akci opakovat později.</h1>
      <Link to="/">Zpět do aplikace</Link>
    </Box>
  );
}
