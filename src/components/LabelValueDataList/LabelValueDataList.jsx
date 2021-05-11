import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function LabelValueDataList({ label, value, url, multiline }) {
  if (!value && !url) return null;
  if (value)
    return (
      <Box
        sx={{
          mb: "4px",
          maxWidth: "700px"
        }}
      >
        <Typography
          sx={{
            mr: "6px",
            whiteSpace: "nowrap",
            display: ["block", multiline ? "block" : "inline-block"]
          }}
          variant="h6"
        >
          {label}:
        </Typography>
        <Typography
          component="span"
          variant="body1"
          sx={{
            wordBreak: "break-word"
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  if (url)
    return (
      <Box
        sx={{
          display: "flex",
          mb: "4px",
          flexDirection: ["column", multiline ? "column" : "row"],
          alignItems: [null, multiline ? null : "baseline"],
          maxWidth: "700px"
        }}
      >
        <Typography
          sx={{
            mr: "6px",
            whiteSpace: "nowrap"
          }}
          variant="h6"
        >
          {label}:
        </Typography>
        <Link
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-all"
          }}
          target="_blank"
          href={url}
        >
          {url}
        </Link>
      </Box>
    );
}

LabelValueDataList.propTypes = {
  label: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  value: PropTypes.string,
  url: PropTypes.string
};
LabelValueDataList.defaultProps = {
  value: null,
  multiline: false,
  url: null
};
