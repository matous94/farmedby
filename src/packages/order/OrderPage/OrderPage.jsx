import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import { selectors } from "src/store";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";
import GenericFailureDialog from "src/components/GenericFailureDialog/GenericFailureDialog";

export default function OrderPage() {
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
          window.location = "/";
        }}
      />
      <Box
        sx={{
          mx: "auto",
          maxWidth: "1000px",
          minHeight: "100vh",
          padding: ["16px", "32px", "46px"]
        }}
      >
        <Paper
          sx={{
            minHeight: "100%",
            position: "relative"
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
            <pre>{JSON.stringify(order, null, 2)}</pre>
          )}
        </Paper>
      </Box>
    </>
  );
}
