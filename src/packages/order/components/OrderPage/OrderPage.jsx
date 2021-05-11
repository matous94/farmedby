import React from "react";
import Box from "@material-ui/core/Box";

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
          minHeight: "100vh",
          pt: "16px",
          pb: "64px",
          px: ["16px", "24px", "32px", "46px"]
        }}
      >
        <OrderOverview />
      </Box>
    </>
  );
}
