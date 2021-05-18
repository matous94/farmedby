import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Link from "@material-ui/core/Link";

import { FarmPropTypes, PickupPointPropTypes } from "src/types";

function PickupPoint({ point, onEdit, onDelete, isAdminMode }) {
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
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {point.isFarmPickupPoint
          ? t("pickupPoint.isFarmPickupPoint.name")
          : name}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {street}
        <br />
        {postcode}
        <br />
        {city}
      </TableCell>
      <TableCell>{pickupDay}</TableCell>
      <TableCell>
        {email && (
          <>
            {email}
            <br />
          </>
        )}
        {phoneNumber && (
          <>
            {phoneNumber}
            <br />
          </>
        )}
        {webUrl && (
          <Link target="_blank" href={webUrl}>
            {t("webAddress")}
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
}
PickupPoint.propTypes = {
  point: PickupPointPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdminMode: PropTypes.bool.isRequired
};
PickupPoint.defaultProps = {
  onEdit: undefined,
  onDelete: undefined
};

function AddPointRow({ onAdd }) {
  return (
    <TableRow>
      <TableCell>
        <ButtonGroup disableElevation variant="contained" color="primary">
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
      <TableCell />
    </TableRow>
  );
}
AddPointRow.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default function PickupPointsTable({
  farm,
  onEdit,
  onDelete,
  onAdd,
  isAdminMode
}) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <TableContainer
      sx={{
        maxWidth: isAdminMode ? "1000px" : "800px"
      }}
      component={Paper}
    >
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <TableRow>
            {isAdminMode && (
              <TableCell> {t("pickupPointsPage.editDelete")}</TableCell>
            )}
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("address")}</TableCell>
            <TableCell sx={{ minWidth: "200px" }}>
              {t("pickupDayLabel")}
            </TableCell>
            <TableCell>{t("contacts")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAdminMode && <AddPointRow onAdd={onAdd} />}
          {farm.isFarmPickupPoint && (
            <PickupPoint
              isAdminMode={isAdminMode}
              onEdit={() => history.push(`/farm/${farm.objectId}`)}
              point={{
                city: farm.city,
                email: farm.email,
                isFarmPickupPoint: farm.isFarmPickupPoint,
                name: farm.name,
                phoneNumber: farm.phoneNumber,
                pickupDay: farm.pickupDay || t("farmPickupDayDefaultValue"),
                postcode: farm.postcode,
                street: farm.street,
                webUrl: farm.webUrl
              }}
            />
          )}
          {farm.pickupPoints.map((point) => (
            <PickupPoint
              isAdminMode={isAdminMode}
              key={point.objectId}
              point={point}
              onEdit={() => onEdit(point)}
              onDelete={() => onDelete(point.objectId)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PickupPointsTable.propTypes = {
  farm: FarmPropTypes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
