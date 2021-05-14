import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

export default function NumberedList({
  stepOffset,
  variant,
  component,
  length,
  translationKey,
  color,
  sx
}) {
  const { t } = useTranslation();
  const list = [];
  for (let i = 1 + stepOffset; i <= length; i += 1) {
    const translation = t(`${translationKey}${i}`);
    list.push(
      <Box key={translation} display="flex">
        <Box
          sx={{
            minWidth: "22px",
            fontWeight: "400"
          }}
        >
          {i - stepOffset}.
        </Box>
        <Box>{translation}</Box>
      </Box>
    );
  }

  return (
    <Typography
      sx={{
        "@media (max-width: 410px)": {
          fontSize: "1rem"
        },
        ...sx
      }}
      color={color}
      variant={variant}
      component={component}
    >
      {list}
    </Typography>
  );
}
NumberedList.propTypes = {
  length: PropTypes.number.isRequired,
  stepOffset: PropTypes.number,
  translationKey: PropTypes.string.isRequired,
  color: PropTypes.string,
  component: PropTypes.string,
  variant: PropTypes.string,
  sx: PropTypes.shape({})
};
NumberedList.defaultProps = {
  color: undefined,
  sx: undefined,
  variant: "h6",
  component: undefined,
  stepOffset: 0
};
