import React from "react";
import Box from "@mui/material/Box";

import AppBar from "src/components/AppBar";
import OrderOverview from "src/packages/order/components/OrderOverview";

export default function OrderPage() {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          mx: "auto",
          maxWidth: "1000px",
          pt: "16px",
          pb: "64px",
          px: ["12px", "16px", "24px", "32px"]
        }}
      >
        <OrderOverview />
      </Box>
    </>
  );
}
