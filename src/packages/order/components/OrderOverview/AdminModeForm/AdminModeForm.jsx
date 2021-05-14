import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useForm } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useStoreActions } from "easy-peasy";

import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";
import { OrderPropTypes } from "src/types";

export default function AdminModeForm({ order }) {
  const { t } = useTranslation();
  const orderUpdated = useStoreActions((actions) => actions.order.orderUpdated);
  console.log(order);
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
      <TextareaAutosize
        ref={register}
        name="journal"
        minRows={10}
        style={{ maxWidth: "700px", width: "100%", padding: "8px" }}
        // placeholder={`${line1}\n${line2}\n${line3}`}
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

// const translationPrefix = "subscriptionsPage.note.placeholder.line";
// const line1 = t(translationPrefix + 1);
// const line2 = t(translationPrefix + 2);
// const line3 = t(translationPrefix + 3);
