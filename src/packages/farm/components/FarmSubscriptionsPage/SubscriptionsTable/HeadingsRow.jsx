import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import { useTranslation } from "react-i18next";

import TableCell from "./TableCell";

export default function HeadingsRow({ isAdminMode }) {
  const { t } = useTranslation();

  return (
    <TableRow>
      {isAdminMode && (
        <TableCell> {t("pickupPointsPage.editDelete")}</TableCell>
      )}
      <TableCell sx={{ minWidth: "200px" }}>
        {t("subscriptionsPage.subscriptionName")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", minWidth: "200px" }}>
        {t("subscriptionsPage.subscriptionContentHeading")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        {t("subscriptionsTable.pricing")}
      </TableCell>
    </TableRow>
  );
}
HeadingsRow.propTypes = {
  isAdminMode: PropTypes.bool.isRequired
};
