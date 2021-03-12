import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles, styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Link from "@material-ui/core/Link";

import {
  FarmPropTypes,
  PickupPointPropTypes
} from "src/packages/farm/farm-types";
import { createAddress } from "src/packages/utils";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  paper: {
    maxWidth: 1000
  }
});

const TableCell = styled(MuiTableCell)({
  paddingLeft: "16px",
  paddingRight: "8px"
});

function PickupPoint({ point, onEdit, onDelete }) {
  const {
    city,
    pickupDay,
    email,
    name,
    phoneNumber,
    postcode,
    street,
    webUrl
  } = point;
  const { t } = useTranslation();
  const { line1, line2 } = createAddress({ city, street, postcode });
  return (
    <TableRow key={name}>
      <TableCell style={{ whiteSpace: "nowrap" }}>{name}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {line1}
        <br />
        {line2}
      </TableCell>
      <TableCell>{pickupDay}</TableCell>
      <TableCell>
        {email}
        <br />
        {phoneNumber}
        <br />
        {webUrl && (
          <Link
            style={{ wordBreak: "break-word", maxWidth: "150px" }}
            href={webUrl}
          >
            {t("webAddress")}
          </Link>
        )}
      </TableCell>
      <TableCell>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button onClick={onEdit}>
            <EditIcon />
          </Button>
          <Button onClick={onDelete}>
            <DeleteForeverIcon />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
PickupPoint.propTypes = {
  point: PickupPointPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
PickupPoint.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};

export default function PickupPointsTable({ farm, onEdit, onDelete }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    city,
    email,
    name,
    phoneNumber,
    postcode,
    street,
    webUrl,
    pickupPoints
  } = farm;

  return (
    <TableContainer className={classes.paper} component={Paper}>
      <Table
        className={classes.table}
        size="small"
        aria-label="pickup points table"
      >
        <TableHead>
          <TableRow>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("address")}</TableCell>
            <TableCell style={{ minWidth: "160px" }}>
              {t("pickupPointsPage.pickupDay")}
            </TableCell>
            <TableCell>{t("contacts")}</TableCell>
            <TableCell style={{ maxWidth: "80px" }}>
              {onEdit && t("pickupPointsPage.editDelete")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farm.isPickupPoint && (
            <PickupPoint
              point={{
                city,
                email,
                name,
                phoneNumber,
                pickupDay: t("pickupPointsPage.pickupDayPlaceholder"),
                postcode,
                street,
                webUrl
              }}
            />
          )}
          {pickupPoints.map((point) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <PickupPoint point={point} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PickupPointsTable.propTypes = {
  farm: FarmPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
PickupPointsTable.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};
