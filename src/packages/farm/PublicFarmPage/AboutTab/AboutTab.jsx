import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FarmPropTypes } from "src/packages/farm/farm-types";

function Contact({ label, value, ...rest }) {
  if (value == null) return null;
  return (
    <Box {...rest}>
      <Typography style={{ marginRight: "6px" }} variant="overline">
        {label}:
      </Typography>
      <Typography component="span" variant="subtitle2">
        {value}
      </Typography>
    </Box>
  );
}
Contact.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};
Contact.defaultProps = {
  value: null
};

export default function AboutTab({ farm }) {
  const {
    about,
    email,
    phoneNumber,
    street,
    houseNumber,
    city,
    postalCode,
    country
  } = farm;
  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Typography variant="h5">Kontakty</Typography>
      <Contact label="Email" value={email} />
      <Contact label="Telefon" value={phoneNumber} />
      <Contact
        label="Adresa"
        value={`${street} ${houseNumber}, ${city}, ${postalCode}, ${country}`}
        mb="16px"
      />
      <Typography variant="h5">O farmě</Typography>
      <Typography variant="body1">{about}</Typography>
    </Box>
  );
}

AboutTab.propTypes = {
  farm: FarmPropTypes.isRequired
};
