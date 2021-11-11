import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "src/components/Link";

import { FarmPropTypes, PickupPointPropTypes } from "src/types";
import { DeliveryPeriodEnum } from "src/packages/pickup-point/delivery-period";
import { createAddress } from "src/packages/utils";

function PickupPoint({ point, onEdit, onDelete, isAdminMode }) {
  const {
    city,
    deliveryPeriod,
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
        {city} {postcode},
        <br />
        {street}
      </TableCell>
      <TableCell>
        {pickupDay}
        {!point.isFarmPickupPoint && (
          <>
            <br />
            <b>{t("pickupPoint.deliveryPeriod.label")}:</b>
            &nbsp;
            {t(`pickupPoint.deliveryPeriod.${deliveryPeriod}`)}
          </>
        )}
      </TableCell>
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

  const sortedPoints = React.useMemo(() => {
    return [...farm.pickupPoints].sort((a, b) => {
      if (
        createAddress(a).countryRelativeReverse ===
        createAddress(b).countryRelativeReverse
      )
        return 0;
      if (
        createAddress(a).countryRelativeReverse <
        createAddress(b).countryRelativeReverse
      )
        return -1;
      return 1;
    });
  }, [farm]);

  return (
    <TableContainer
      sx={{
        maxWidth: "1000px"
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
            <TableCell sx={{ minWidth: "200px", whiteSpace: "nowrap" }}>
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
                deliveryPeriod: DeliveryPeriodEnum.week,
                email: farm.email,
                isFarmPickupPoint: farm.isFarmPickupPoint,
                name: farm.name,
                phoneNumber: farm.phoneNumber,
                pickupDay:
                  farm.pickupDay || t("pickupPoint.pickupDayDefaultValue"),
                postcode: farm.postcode,
                street: farm.street,
                webUrl: farm.webUrl
              }}
            />
          )}
          {sortedPoints.map((point) => (
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
