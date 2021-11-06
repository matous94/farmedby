import React from "react";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";
import Typography from "@mui/material/Typography";
import LabelValueData, { ILabelValueData } from "src/components/LabelValueData";

interface Props {
  items: ILabelValueData[];
  heading?: string;
  sx?: SxProps;
}

export default function LabelValueDataList({
  items,
  heading,
  sx
}: Props): JSX.Element {
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
