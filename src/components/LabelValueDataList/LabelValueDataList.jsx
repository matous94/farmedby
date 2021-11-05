import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LabelValueData, {
  LabelValueDataPropTypes
} from "src/components/LabelValueData";

export default function LabelValueDataList({ items, heading, sx }) {
  return (
    <Box sx={{ width: "100%", ...sx }}>
      {heading && <Typography variant="h5">{heading}</Typography>}
      {items
        .filter((item) => item.value || item.href || item.to)
        .map(({ sx: itemSx, ...rest }, index) => (
          <LabelValueData
            key={index}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            sx={{
              mb: "6px",
              "&:last-child": {
                marginBottom: 0
              },
              ...itemSx
            }}
          />
        ))}
    </Box>
  );
}

LabelValueDataList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(LabelValueDataPropTypes)).isRequired,
  sx: PropTypes.shape({}),
  heading: PropTypes.string
};
LabelValueDataList.defaultProps = {
  sx: undefined,
  heading: undefined
};
