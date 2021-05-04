import * as React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";

import { SubscriptionPropTypes } from "src/types";

import TableCell from "./TableCell";

export default function SubscriptionRow({
  subscription,
  onEdit,
  onDelete,
  isAdminMode,
  currency
}) {
  const { t } = useTranslation();
  const { name, content, options } = subscription;
  return (
    <TableRow>
      {isAdminMode && (
        <TableCell>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button onClick={onEdit}>
              <EditIcon />
            </Button>
            <Button onClick={onDelete} disabled={onDelete == null}>
              <DeleteForeverIcon />
            </Button>
          </ButtonGroup>
        </TableCell>
      )}
      <TableCell>{name}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        <Box sx={{ display: "inline-flex", flexDirection: "column" }}>
          {options
            .filter(
              (option) => option?.pricePerDelivery && option.numberOfDeliveries
            )
            .map(
              ({ pricePerDelivery, numberOfDeliveries }, index, { length }) => {
                return (
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    key={index}
                  >
                    <Box sx={{ textAlign: "right", minWidth: "24px" }}>
                      {numberOfDeliveries}
                    </Box>
                    <Box>&nbsp;{t("pc")}</Box>
                    <Box sx={{ mx: "3px" }}>{">"}</Box>
                    <Box
                      sx={{
                        mr: "4px",
                        fontWeight: "bold",
                        minWidth: "25px"
                      }}
                    >
                      {pricePerDelivery}
                      &nbsp;
                      {currency}
                      {"/"}
                      {t("pc")}
                    </Box>
                    {index < length - 1 && <br />}
                  </Box>
                );
              }
            )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
SubscriptionRow.propTypes = {
  subscription: SubscriptionPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdminMode: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired
};
SubscriptionRow.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};
