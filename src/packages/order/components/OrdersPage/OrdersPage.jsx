import React from "react";
import Box from "@material-ui/core/Box";

import Link from "src/components/Link";
import { FarmPropTypes } from "src/types";

export default function OrdersPage({ farm }) {
  const { orders } = farm;
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        width: "100%"
      }}
    >
      {orders.map(({ objectId }) => (
        <Link
          sx={{ display: "block" }}
          key={objectId}
          to={`/order/${objectId}`}
        >
          {`#${objectId}`}
        </Link>
      ))}
    </Box>
  );
}
OrdersPage.propTypes = {
  farm: FarmPropTypes.isRequired
};
