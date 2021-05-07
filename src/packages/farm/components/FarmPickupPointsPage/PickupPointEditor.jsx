import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";

import { PickupPointPropTypes } from "src/types";

export default function PickupPointEditor({ onClose, onSubmit, point }) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ defaultValues: point });
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
        onSubmit={handleSubmit(onSubmit)}
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
          <TextField
            name="addressLevel1"
            label={t("addressLevel1Label")}
            type="text"
          />
          <TextField
            name="pickupDay"
            label={t("pickupDayLabel")}
            placeholder={t("pickupDayPlaceholder")}
            InputLabelProps={{ shrink: true }}
            type="text"
            multiline
            required={true}
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
  point: PickupPointPropTypes
};
PickupPointEditor.defaultProps = {
  point: undefined
};
