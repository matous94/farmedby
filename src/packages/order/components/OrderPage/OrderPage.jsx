import React from "react";
import Box from "@material-ui/core/Box";

import AppBar, { useAppBarMinHeight } from "src/components/AppBar";
import OrderOverview from "src/packages/order/components/OrderOverview";

export default function OrderPage() {
  const appBarMinHeight = useAppBarMinHeight();
  return (
    <>
      <AppBar />
      <Box
        sx={{
          mx: "auto",
          maxWidth: "1000px",
          minHeight: `calc(100vh - ${appBarMinHeight}px)`,
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
