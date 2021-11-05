import React from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FarmIcon from "src/icons/FarmIcon";

export default function Heading() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        mt: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Avatar
        sx={{
          margin: "8px 0",
          backgroundColor: (theme) => theme.palette.secondary.main
        }}
      >
        <FarmIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("myFarm")}
      </Typography>
    </Box>
  );
}
