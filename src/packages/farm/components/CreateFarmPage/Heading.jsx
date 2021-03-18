import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@material-ui/core";
import MuiAvatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import FarmIcon from "src/icons/FarmIcon";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  margin: "8px 0",
  backgroundColor: theme.palette.secondary.main
}));

export default function Heading() {
  const { t } = useTranslation();

  return (
    <Box mt="16px" display="flex" flexDirection="column" alignItems="center">
      <Avatar>
        <FarmIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("myFarm")}
      </Typography>
    </Box>
  );
}
