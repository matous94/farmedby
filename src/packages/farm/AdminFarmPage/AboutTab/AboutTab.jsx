import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { FarmPropTypes } from "src/packages/farm/farm-prop-types";

function Contact({ label, value }) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      style={{ marginBottom: "16px" }}
      value={value}
      label={label}
    />
  );
}
Contact.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};
Contact.defaultProps = {
  value: ""
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
    webUrl,
    country
  } = farm;
  return (
    <Box width="100%" display="flex" flexDirection="column" pb="64px">
      <Typography gutterBottom variant="h5">
        Kontakty
      </Typography>
      <Box mt="8px" mb="16px">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Contact label="Email" value={email} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Contact label="Telefon" value={phoneNumber} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Contact label="Web/Facebook URL" value={webUrl} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Contact label="Country" value={country} />
          </Grid>
          <Grid item xs={9}>
            <Contact label="Ulice" value={street} />
          </Grid>
          <Grid item xs={3}>
            <Contact label="Č.P." value={houseNumber} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Contact label="Město" value={city} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Contact label="PSČ" value={postalCode} />
          </Grid>
        </Grid>
      </Box>
      <Typography gutterBottom variant="h5">
        O farmě
      </Typography>
      <TextareaAutosize rowsMin={10} style={{ width: "100%" }} value={about} />
    </Box>
  );
}

AboutTab.propTypes = { farm: FarmPropTypes.isRequired };
