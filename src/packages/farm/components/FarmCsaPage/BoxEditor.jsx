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

import { BoxPropTypes, BoxOptionPropTypes } from "src/types";

const TextField = ({ register, ...rest }) => {
  /* eslint-disable*/
  return (
    <MuiTextField
      margin="dense"
      size="small"
      fullWidth
      variant="outlined"
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

function Pricing({ options, register, currency }) {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="subtitle1">{t("pricing")}</Typography>
      {options.map((option, index) => (
        <Box key={index} mt="4px">
          <Box display="flex" justifyContent="space-between">
            <TextField
              name={`options[${index}].numberOfBoxes`}
              label={t("boxEditor.numberOfBoxes")}
              type="number"
              inputProps={{
                min: "1"
              }}
              style={{ width: "48%" }}
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
              style={{ width: "48%" }}
              register={register}
              required={index === 0}
            />
          </Box>
        </Box>
      ))}
    </>
  );
}
Pricing.propTypes = {
  options: PropTypes.arrayOf(BoxOptionPropTypes).isRequired,
  register: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired
};

export default function BoxEditor({ onClose, onSubmit, box, currency }) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm({ defaultValues: box });
  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("xs"));

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
        <DialogTitle sx={{ paddingBottom: 0 }}>
          {t("boxEditor.heading")}
        </DialogTitle>
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
BoxEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  box: BoxPropTypes,
  currency: PropTypes.string.isRequired
};
const defaultOption = {
  numberOfBoxes: "",
  pricePerBox: ""
};
BoxEditor.defaultProps = {
  box: {
    name: "",
    content: "",
    options: [
      defaultOption,
      defaultOption,
      defaultOption,
      defaultOption,
      defaultOption
    ]
  }
};
