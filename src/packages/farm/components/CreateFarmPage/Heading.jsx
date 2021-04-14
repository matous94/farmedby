import React from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
