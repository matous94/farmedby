import React from "react";
import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function HeadingsRow() {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell sx={{ minWidth: "200px" }}>
        {t("subscriptionsPage.subscriptionName")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", minWidth: "200px" }}>
        {t("subscriptionsPage.subscriptionDescriptionHeading")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        {t("subscriptionsTable.numberOfDeliveriesHeading")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        {t("subscriptionsTable.pricePerDelivery.heading")}
      </TableCell>
      <TableCell
        sx={{ whiteSpace: "nowrap", textAlign: "center", minWidth: "100px" }}
      >
        {t("subscriptionsTable.priceHeading")}
      </TableCell>
    </TableRow>
  );
}
