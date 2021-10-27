import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import {
  countries,
  getCountryCode,
  changeCountry,
  CountryCode
} from "src/i18n";

export default function CountrySelector(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = React.useState(
    getCountryCode()
  );

  const handleOpen: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (countryCode: CountryCode): void => {
    setSelectedCountry(countryCode);
    changeCountry(countryCode);
    handleClose();
  };

  return (
    <>
      <Box width="100%" height="100%" position="relative" onClick={handleOpen}>
        <Box
          sx={{
            borderRadius: "50%",
            position: "absolute",
            border: [
              "2px solid rgba(0, 0, 0, 0.2)",
              "3px solid rgba(0, 0, 0, 0.2)",
              "4px solid rgba(0, 0, 0, 0.2)"
            ],
            width: "100%",
            height: "100%",
            cursor: "pointer"
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: "50%"
          }}
          component="img"
          alt={countries[selectedCountry].countryName}
          src={countries[selectedCountry].flagSrc}
        />
      </Box>
      <Menu
        elevation={1}
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
        {Object.values(countries).map(
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