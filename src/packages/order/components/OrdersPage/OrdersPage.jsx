import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { FarmPropTypes } from "src/types";

import OrderPreviewList from "./OrderPreviewList";
import SortBy from "./SortBy";

export default function OrdersPage({ farm }) {
  const { t } = useTranslation();
  const { orders } = farm;

  const { activeOrders, completedOrders } = React.useMemo(() => {
    const result = {
      activeOrders: [],
      completedOrders: []
    };

    orders.forEach((order) =>
      order.completed
        ? result.completedOrders.push(order)
        : result.activeOrders.push(order)
    );
    return result;
  }, [orders]);

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        width: "100%",
        pt: ["8px", "16px"],
        pl: ["12px", "0px", "32px", "128px"],
        pr: ["0px", null, "8px", "32px"]
      }}
    >
      <Box sx={{ mb: "24px", display: "flex", justifyContent: "center" }}>
        <SortBy />
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} item>
          <Typography sx={{ mb: "16px" }} variant="h4">
            {t("order.status.active")}
          </Typography>
          <OrderPreviewList
            farmId={farm.objectId}
            orders={activeOrders}
            sortBy="createdAt"
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography sx={{ mb: "16px" }} variant="h4">
            {t("order.orders.completed.heading")}
          </Typography>
          <OrderPreviewList
            farmId={farm.objectId}
            orders={completedOrders}
            sortBy="createdAt"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
OrdersPage.propTypes = {
  farm: FarmPropTypes.isRequired
};
