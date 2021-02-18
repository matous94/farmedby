import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import {
  supportedLanguages,
  getCurrentLanguage,
  changeLanguage
} from "src/i18n";

export default function CountrySelector() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    getCurrentLanguage()
  );

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode);
  };

  return (
    <>
      <Box
        width="100%"
        height="100%"
        component="img"
        alt={supportedLanguages[selectedLanguage].countryName}
        src={supportedLanguages[selectedLanguage].flagSrc}
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
        {Object.entries(supportedLanguages).map(([lng, resources]) => (
          <MenuItem
            key={lng}
            onClick={() => handleChange(lng)}
            selected={lng === selectedLanguage}
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
