import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

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
        {t("subscriptionsPage.subscriptionDescriptionHeading")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        {t("subscriptionsTable.pricingHeading")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        {t("subscriptionsTable.numberOfDeliveriesHeading")}
      </TableCell>
      <TableCell
        sx={{ whiteSpace: "nowrap", textAlign: "center", minWidth: "100px" }}
      >
        {t("subscriptionsTable.priceHeading")}
      </TableCell>
    </TableRow>
  );
}
HeadingsRow.propTypes = {
  isAdminMode: PropTypes.bool.isRequired
};
