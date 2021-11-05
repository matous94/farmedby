import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function ListItem({ number, content }) {
  return (
    <Box display="flex">
      <Box
        sx={{
          minWidth: "22px",
          fontWeight: "400"
        }}
      >
        {number}.
      </Box>
      <Box>{content}</Box>
    </Box>
  );
}
ListItem.propTypes = {
  number: PropTypes.number.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

export default function NumberedList({
  stepOffset,
  variant,
  component,
  length,
  translationKey,
  translations,
  color,
  sx
}) {
  const { t } = useTranslation();
  const list = [];

  if (length) {
    for (let i = 1 + stepOffset; i <= length; i += 1) {
      const translation = t(`${translationKey}${i}`);
      list.push(
        <ListItem key={i} content={translation} number={i - stepOffset} />
      );
    }
  } else if (translations) {
    translations.forEach((translation, index) =>
      list.push(
        <ListItem key={index} content={translation} number={index + 1} />
      )
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
  length: PropTypes.number,
  stepOffset: PropTypes.number,
  translationKey: PropTypes.string,
  translations: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ),
  color: PropTypes.string,
  component: PropTypes.string,
  variant: PropTypes.string,
  sx: PropTypes.shape({})
};
NumberedList.defaultProps = {
  color: undefined,
  sx: undefined,
  variant: "h6",
  length: undefined,
  translationKey: undefined,
  component: undefined,
  stepOffset: 0,
  translations: undefined
};
