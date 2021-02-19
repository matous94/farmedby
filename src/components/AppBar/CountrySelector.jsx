import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import {
  supportedCountries,
  getCurrentCountryCode,
  changeCountry
} from "src/i18n";

export default function CountrySelector() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCountry, setSelectedCountry] = React.useState(
    getCurrentCountryCode()
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
      <Box
        width="100%"
        height="100%"
        component="img"
        alt={supportedCountries[selectedCountry].countryName}
        src={supportedCountries[selectedCountry].flagSrc}
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      />
      <Menu
        elevation={0}
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
        {Object.entries(supportedCountries).map(([countryCode, resources]) => (
          <MenuItem
            key={countryCode}
            onClick={() => handleChange(countryCode)}
            selected={countryCode === selectedCountry}
          >
            <ListItemAvatar>
              <Avatar alt={resources.countryName} src={resources.flagSrc} />
            </ListItemAvatar>
            <ListItemText primary={resources.countryName} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
