import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import { supportedCountries, getCountryCode, changeCountry } from "src/i18n";

export default function CountrySelector() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCountry, setSelectedCountry] = React.useState(
    getCountryCode()
  );

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (countryCode) => {
    setSelectedCountry(countryCode);
    changeCountry(countryCode);
    handleClose();
  };

  return (
    <>
      <Box width="100%" height="100%" position="relative" onClick={handleOpen}>
        <Box
          borderRadius="50%"
          position="absolute"
          border={[
            "2px solid rgba(0, 0, 0, 0.2)",
            "3px solid rgba(0, 0, 0, 0.2)",
            "4px solid rgba(0, 0, 0, 0.2)"
          ]}
          width="100%"
          height="100%"
          style={{ cursor: "pointer" }}
        />
        <Box
          width="100%"
          height="100%"
          component="img"
          alt={supportedCountries[selectedCountry].countryName}
          src={supportedCountries[selectedCountry].flagSrc}
          borderRadius="50%"
          style={{ cursor: "pointer", objectFit: "cover" }}
        />
      </Box>
      <Menu
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.values(supportedCountries).map(
          ({ countryCode, countryName, flagSrc }) => (
            <MenuItem
              key={countryCode}
              onClick={() => handleChange(countryCode)}
              selected={countryCode === selectedCountry}
            >
              <ListItemAvatar>
                <Avatar alt={countryName} src={flagSrc} />
              </ListItemAvatar>
              <ListItemText primary={countryName} />
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}
