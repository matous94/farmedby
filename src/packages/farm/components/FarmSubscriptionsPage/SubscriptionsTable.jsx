import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { FarmPropTypes, SubscriptionPropTypes } from "src/types";
import { getCurrency } from "src/i18n";

const TableCell = styled(MuiTableCell)({
  paddingLeft: "16px",
  paddingRight: "8px"
});

function Subscription({ subscription, onEdit, onDelete, isAdminMode }) {
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
      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
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
                    <Box sx={{ mx: "3px" }}>x</Box>
                    <Box
                      sx={{ mr: "2px", fontWeight: "bold", minWidth: "25px" }}
                    >
                      {pricePerDelivery}
                    </Box>
                    (= {Number(numberOfDeliveries) * Number(pricePerDelivery)})
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
Subscription.propTypes = {
  subscription: SubscriptionPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdminMode: PropTypes.bool.isRequired
};
Subscription.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};

function AddPointRow({ onAdd }) {
  return (
    <TableRow>
      <TableCell>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={onAdd}>
            <AddCircleIcon />
          </Button>
          <Button disabled>
            <DeleteForeverIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );
}
AddPointRow.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default function SubscriptionsTable({
  farm,
  onEdit,
  onDelete,
  onAdd,
  isAdminMode
}) {
  const { t } = useTranslation();
  const { subscriptions } = farm;

  return (
    <TableContainer
      sx={{
        maxWidth: "800px"
      }}
      component={Paper}
    >
      <Table size="small" aria-label="pickup points table">
        <TableHead>
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
            <TableCell sx={{ whiteSpace: "nowrap" }}>
              {t("subscriptionsTable.priceHeading", {
                currency: getCurrency(farm.countryCode)
              })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAdminMode && <AddPointRow onAdd={onAdd} />}

          {[...subscriptions]
            .sort((a, b) => {
              if (a.name === b.name) return 0;
              if (a.name < b.name) return -1;
              return 1;
            })
            .map((subscription) => (
              <Subscription
                isAdminMode={isAdminMode}
                key={subscription.objectId}
                subscription={subscription}
                onEdit={() => onEdit(subscription)}
                onDelete={() => onDelete(subscription.objectId)}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SubscriptionsTable.propTypes = {
  farm: FarmPropTypes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
