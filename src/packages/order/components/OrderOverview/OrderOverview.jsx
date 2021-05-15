import React from "react";
import PropTypes from "prop-types";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useTranslation } from "react-i18next";
import { useParams, useHistory, Redirect } from "react-router-dom";
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
import OrderedSubscriptionsTable from "./OrderedSubscriptionsTable";
import AdminModeForm from "./AdminModeForm/AdminModeForm";

export default function OrderOverview({ isAdminMode }) {
  const { t } = useTranslation();
  const { pageId, farmId } = useParams();
  const history = useHistory();
  const order = useStoreState(selectors.order.createGetOrder(pageId));
  const orderResolved = useStoreActions(
    (actions) => actions.order.orderResolved
  );
  const hasOrder = Boolean(order);
  const orderGetter = useAsync(
    async () => {
      const resolvedOrder = await ApiClient.Order.getOrder(pageId);
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

  if (!pageId) {
    return <Redirect to={farmId ? `/farm/${farmId}` : "/"} />;
  }

  return (
    <>
      <GenericFailureDialog
        isOpen={orderGetter.hasError}
        onClose={() => {
          if (farmId) {
            history.push(`/farm/${farmId}`);
          } else {
            window.location = "/";
          }
        }}
      />
      <Typography
        sx={{ marginBottom: "16px" }}
        align="center"
        color="secondary"
        variant="h3"
      >
        {t("orderPage.heading", { orderId: pageId })}
      </Typography>
      <Paper
        sx={{
          width: "100%",
          position: "relative",
          p: ["12px", null, "24px"]
        }}
      >
        {orderGetter.isLoading && (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        )}
        {orderGetter.isResolved && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <OrderData order={order} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FarmData farm={order.farm} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomerData customer={order.customer} note={order.note} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PickupPointData pickupPoint={order.pickupPoint} />
              </Grid>
            </Grid>
            <Typography
              variant="h5"
              sx={{ mt: ["24px", "32px"], mb: ["6px", "10px"] }}
            >
              {t("subscription.subscriptions.heading")}
            </Typography>
            <OrderedSubscriptionsTable
              subscriptions={order.subscriptions}
              countryCode={order.farm.countryCode}
            />
            {isAdminMode && <AdminModeForm order={order} />}
          </>
        )}
      </Paper>
    </>
  );
}
OrderOverview.propTypes = {
  isAdminMode: PropTypes.bool
};
OrderOverview.defaultProps = {
  isAdminMode: false
};
