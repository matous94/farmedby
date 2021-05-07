import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

export default function NumberedList({ length, translationKey, color, sx }) {
  const { t } = useTranslation();
  const list = [];
  for (let i = 1; i <= length; i += 1) {
    const translation = t(`${translationKey}${i}`);
    list.push(
      <Box key={translation} display="flex">
        <Box
          sx={{
            minWidth: "22px",
            fontWeight: "400"
          }}
        >
          {i}.
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
      variant="h6"
      component="h2"
    >
      {list}
    </Typography>
  );
}
NumberedList.propTypes = {
  length: PropTypes.number.isRequired,
  translationKey: PropTypes.string.isRequired,
  color: PropTypes.string,
  sx: PropTypes.shape({})
};
NumberedList.defaultProps = {
  color: undefined,
  sx: undefined
};
