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
          margin="dense"
          fullWidth
          variant="outlined"
          inputRef={register}
          required={true}
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
        display="flex"
        flexDirection="column"
      >
        <DialogTitle style={{ paddingBottom: 0 }}>
          {t("pickupPointEditor.heading")}
        </DialogTitle>
        <DialogContent>
          <TextField name="name" label={t("name")} type="text" />
          <TextField name="street" label={t("addressLine1")} type="text" />
          <Box display="flex" justifyContent="space-between">
            <TextField
              name="city"
              label={t("city")}
              type="text"
              style={{ width: "63%" }}
            />
            <TextField
              name="postcode"
              label={t("postcode")}
              type="text"
              style={{ width: "35%" }}
            />
          </Box>
          <TextField
            name="pickupDay"
            label={t("pickupPointsPage.pickupDay")}
            placeholder={t("pickupPointsPage.pickupDayPlaceholder")}
            InputLabelProps={{ shrink: true }}
            type="text"
            multiline
          />
          <TextField
            name="email"
            label={t("email")}
            type="email"
            required={false}
          />
          <TextField
            name="phoneNumber"
            label={t("phoneNumber")}
            type="tel"
            required={false}
          />
          <TextField
            name="webUrl"
            label={t("webAddress")}
            type="url"
            required={false}
          />
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
