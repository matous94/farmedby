import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { selectors } from "src/store";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";
import GenericFailureDialog from "src/components/GenericFailureDialog/GenericFailureDialog";

import OrderData from "./OrderData";
import CustomerData from "./CustomerData";
import FarmData from "./FarmData";
import PickupPointData from "./PickupPointData";

export default function OrderOverview() {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const order = useStoreState(selectors.order.createGetOrder(orderId));
  const orderResolved = useStoreActions(
    (actions) => actions.order.orderResolved
  );
  const hasOrder = Boolean(order);
  const orderGetter = useAsync(
    async () => {
      const resolvedOrder = await ApiClient.Order.getOrder(orderId);
      orderResolved(resolvedOrder);
      return resolvedOrder;
    },
    {
      hasCache: hasOrder,
      cache: order,
      runOnMount: !hasOrder,
      functionName: "getOrder"
    }
  );

  return (
    <>
      <GenericFailureDialog
        isOpen={orderGetter.hasError}
        onClose={() => {
          window.location = `/`;
        }}
      />
      <Typography
        sx={{ marginBottom: "12px" }}
        align="center"
        color="secondary"
        variant="h4"
      >
        {t("orderPage.heading", { orderId })}
      </Typography>
      <Paper
        sx={{
          minHeight: "100%",
          width: "100%",
          position: "relative",
          p: ["12px", null, "24px"]
        }}
      >
        {orderGetter.isLoading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "100px",
              left: "calc(50% - 20px)"
            }}
          />
        )}
        {orderGetter.isResolved && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <OrderData order={order} sx={{ mb: "16px" }} />
              <FarmData farm={order.farm} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomerData customer={order.customer} note={order.note} />
              <PickupPointData
                pickupPoint={order.pickupPoint}
                sx={{ mt: "16px" }}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
}
