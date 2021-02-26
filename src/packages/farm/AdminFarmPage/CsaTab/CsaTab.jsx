import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FarmPropTypes } from "src/packages/farm/farm-types";

export default function CsaTab({ farm }) {
  const { aboutCsa } = farm;
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">O KPZ</Typography>
      <Typography paragraph variant="body1">
        {aboutCsa}
      </Typography>
      <Typography variant="h5">Naše Bedýnky</Typography>
    </Box>
  );
}

CsaTab.propTypes = { farm: FarmPropTypes.isRequired };
