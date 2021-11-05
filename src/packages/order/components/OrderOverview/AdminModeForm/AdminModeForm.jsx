import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useStoreActions } from "easy-peasy";
import useMediaQuery from "@mui/material/useMediaQuery";

import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";
import { OrderPropTypes } from "src/types";
import Textarea from "src/components/Textarea";

export default function AdminModeForm({ order }) {
  const { t } = useTranslation();
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const orderUpdated = useStoreActions((actions) => actions.order.orderUpdated);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      completed: order.completed,
      journal: order.journal
    }
  });

  const orderUpdater = useAsync(async function onSubmit({
    journal,
    completed
  }) {
    const update = {
      objectId: order.objectId,
      journal,
      completed
    };
    // loading feedback for user because we dont do
    // any transition after this action
    await new Promise((resolve) => setTimeout(resolve, 300));
    await ApiClient.Order.updateOrder(update);
    orderUpdated(update);
  });
  return (
    <form onSubmit={handleSubmit(orderUpdater.execute)}>
      <Dialog isLoading={orderUpdater.isLoading} />
      <GenericFailureDialog
        isOpen={orderUpdater.hasError}
        onClose={orderUpdater.reset}
      />
      <Typography
        variant="h5"
        sx={{ mt: ["24px", "32px"], mb: ["6px", "10px"] }}
      >
        {t("order.journal.heading")}
      </Typography>
      <Textarea
        register={register}
        name="journal"
        minRows={isDownSm ? 19 : 16}
        style={{ maxWidth: "700px", width: "100%", padding: "8px" }}
        placeholder={t("subscription.journal.placeholder")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: "24px"
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              inputRef={register}
              name="completed"
              defaultChecked={order.completed}
            />
          }
          label={t("order.adminModeForm.completed.label")}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: "8px", minWidth: "240px" }}
        >
          {t("save")}
        </Button>
      </Box>
    </form>
  );
}
AdminModeForm.propTypes = {
  order: OrderPropTypes.isRequired
};
