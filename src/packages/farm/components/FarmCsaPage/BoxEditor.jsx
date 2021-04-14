import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import MuiTextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { BoxPropTypes } from "src/types";

const TextField = ({ register, ...rest }) => {
  /* eslint-disable*/
  return (
    <MuiTextField
      margin="dense"
      size="small"
      fullWidth
      inputRef={register}
      InputLabelProps={{ shrink: true }}
      {...rest}
    />
    /* eslint-enable */
  );
};
TextField.propTypes = {
  register: PropTypes.func.isRequired
};

function Pricing({ register, currency }) {
  const { t } = useTranslation();
  const optionsList = [];
  const numberOfOptions = 5;

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < numberOfOptions; index++) {
    optionsList.push(
      <Box key={index} sx={{ mt: "4px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            name={`options[${index}].numberOfBoxes`}
            label={t("boxEditor.numberOfBoxes")}
            type="number"
            inputProps={{
              min: "1"
            }}
            sx={{ width: "48%" }}
            register={register}
            required={index === 0}
          />
          <TextField
            name={`options[${index}].pricePerBox`}
            label={t("boxEditor.pricePerBox", { currency })}
            type="number"
            inputProps={{
              min: "0.01",
              step: "0.01"
            }}
            sx={{ width: "48%" }}
            register={register}
            required={index === 0}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="subtitle1">{t("pricing")}</Typography>
      {optionsList}
    </>
  );
}
Pricing.propTypes = {
  register: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired
};

export default function BoxEditor({ onClose, onSubmit, box, currency }) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ defaultValues: box });
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
        <DialogTitle sx={{ pb: 0 }}>{t("boxEditor.heading")}</DialogTitle>
        <DialogContent>
          <TextField
            register={register}
            name="name"
            label={t("csaPage.boxName")}
            placeholder={t("boxEditor.namePlaceholder")}
            type="text"
            required
          />
          <TextField
            sx={{ marginBottom: "16px", marginTop: "8px" }}
            register={register}
            name="content"
            label={t("csaPage.boxContentHeading")}
            placeholder={t("csaPage.boxContentPlaceholder")}
            multiline
            type="text"
            required
          />
          <Pricing
            options={box.options}
            register={register}
            currency={currency}
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button type="submit">{t("save")}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
BoxEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  box: BoxPropTypes,
  currency: PropTypes.string.isRequired
};
BoxEditor.defaultProps = {
  box: {
    name: "",
    content: "",
    options: []
  }
};
