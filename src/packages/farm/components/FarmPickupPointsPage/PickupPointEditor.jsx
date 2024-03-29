import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

import Select from "src/components/Select";
import { PickupPointPropTypes } from "src/types";
import { useDeliveryPeriodOptions } from "src/packages/pickup-point/delivery-period";

export default function PickupPointEditor({
  onClose,
  onSubmit,
  point,
  requiresAddressLevel1
}) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ defaultValues: point });
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const deliveryPeriodOptions = useDeliveryPeriodOptions();
  const [deliveryPeriod, setDeliveryPeriod] = React.useState(
    point?.deliveryPeriod || deliveryPeriodOptions.week.id
  );

  const TextField = React.useCallback(
    (props) => {
      /* eslint-disable*/
      return (
        <MuiTextField
          margin="normal"
          size="small"
          fullWidth
          inputRef={register}
          {...props}
        />
        /* eslint-enable */
      );
    },
    [register]
  );

  return (
    <Dialog
      fullScreen={isDownSm}
      fullWidth
      maxWidth="xs"
      open={true}
      onClose={onClose}
    >
      <Box
        component="form"
        onSubmit={handleSubmit((pickupPointData) =>
          onSubmit({ ...pickupPointData, deliveryPeriod })
        )}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <DialogTitle sx={{ paddingBottom: 0 }}>{t("pickupPoint")}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label={t("name")}
            type="text"
            required={true}
          />
          <TextField
            name="street"
            label={t("addressLine1")}
            type="text"
            required={true}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              name="city"
              label={t("city")}
              type="text"
              sx={{ width: "63%" }}
              required={true}
            />
            <TextField
              name="postcode"
              label={t("postcode")}
              type="text"
              sx={{ width: "35%" }}
              required={true}
            />
          </Box>
          {requiresAddressLevel1 && (
            <TextField
              name="addressLevel1"
              label={t("addressLevel1Label")}
              type="text"
              required={true}
            />
          )}
          <TextField
            name="pickupDay"
            label={t("pickupDayLabel")}
            placeholder={t("pickupDayPlaceholder")}
            InputLabelProps={{ shrink: true }}
            type="text"
            multiline
            required={true}
          />
          <Select
            size="small"
            margin="normal"
            onChange={(e) => setDeliveryPeriod(e.target.value)}
            value={deliveryPeriod}
            label={t("pickupPoint.deliveryPeriod.label")}
            options={deliveryPeriodOptions}
            name="deliveryPeriod"
          />
          <TextField name="email" label={t("email")} type="email" />
          <TextField name="phoneNumber" label={t("phoneNumber")} type="tel" />
          <TextField name="webUrl" label={t("webAddress")} type="url" />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose} color="primary">
            {t("cancel")}
          </Button>
          <Button type="submit" color="primary">
            {t("save")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
PickupPointEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  point: PickupPointPropTypes,
  requiresAddressLevel1: PropTypes.bool.isRequired
};
PickupPointEditor.defaultProps = {
  point: undefined
};
