import * as React from "react";
import Button from "@material-ui/core/Button";

export default function StyledButton(props) {
  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      sx={{
        borderRadius: 0,
        fontWeight: (theme) => theme.typography.fontWeightMedium,
        fontFamily: (theme) => theme.typography.fontFamilySecondary,
        padding: ["12px 20px", "16px 32px"],
        fontSize: (theme) => theme.typography.pxToRem(14),
        boxShadow: "none",
        "&:active, &:focus": {
          boxShadow: "none"
        },
        // eslint-disable-next-line react/destructuring-assignment, react/prop-types
        ...props.sx
      }}
    />
  );
}
