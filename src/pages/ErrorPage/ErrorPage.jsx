import React from "react";
import Box from "@mui/material/Box";
import { NavigationLink } from "src/components/Link";

export default function ErrorPage() {
  return (
    <Box sx={{ p: "32px" }}>
      <h1>Něco se porouchalo. Zkuste akci opakovat později.</h1>
      <NavigationLink to="/">Zpět do aplikace</NavigationLink>
    </Box>
  );
}
