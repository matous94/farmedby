import React from "react";
import Box from "@material-ui/core/Box";

import Link from "src/components/Link";
import { FarmPropTypes } from "src/types";

export default function OrdersPage({ farm }) {
  const { ordersIds } = farm;
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {ordersIds.map((orderId) => (
        <Link key={orderId} to={`/order/${orderId}`}>
          {`#${orderId}`}
        </Link>
      ))}
    </Box>
  );
}
OrdersPage.propTypes = {
  farm: FarmPropTypes.isRequired
};
