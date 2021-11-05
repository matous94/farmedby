/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import MuiLink from "@mui/material/Link";
import NavigationLink from "src/components/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LabelValueData({
  label,
  value,
  href,
  to,
  multiline,
  sx
}) {
  if (!value && !href && !to) return null;
  const useHrefEllipsis = href && !value;
  let content;
  let boxSx = sx;

  if (href) {
    let sxProps = {
      fontSize: "0.875rem",
      lineHeight: "1.45",
      wordBreak: "break-word"
    };
    if (useHrefEllipsis) {
      sxProps = {
        ...sxProps,
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-all",
        maxWidth: "440px"
      };
    }

    content = (
      <MuiLink sx={sxProps} target="_blank" href={href}>
        {value || href}
      </MuiLink>
    );
    if (useHrefEllipsis) {
      boxSx = {
        ...boxSx,
        maxWidth: "100%",
        display: "flex",
        flexDirection: ["column", multiline ? "column" : "row"],
        alignItems: [null, multiline ? null : "center"]
      };
    }
  } else if (to) {
    content = (
      <NavigationLink
        sx={{
          fontSize: "0.875rem",
          wordBreak: "break-word",
          lineHeight: "1.45"
        }}
        to={to}
      >
        {value || to}
      </NavigationLink>
    );
  } else if (value) {
    content = (
      <Typography
        variant="body2"
        sx={{
          wordBreak: "break-word",
          display: "inline"
        }}
      >
        {value}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        lineHeight: "1",
        ...boxSx
      }}
    >
      <Typography
        sx={{
          mr: "6px",
          whiteSpace: "nowrap",
          fontWeight: 700,
          lineHeight: "1.45",
          display: multiline ? "block" : "inline-block"
        }}
        variant="overline"
      >
        {label}:
      </Typography>
      {content}
    </Box>
  );
}

export const LabelValueDataPropTypes = {
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  href: PropTypes.string,
  to: PropTypes.string,
  sx: PropTypes.shape({})
};

LabelValueData.propTypes = LabelValueDataPropTypes;
LabelValueData.defaultProps = {
  value: undefined,
  multiline: false,
  href: undefined,
  to: undefined,
  sx: undefined
};
