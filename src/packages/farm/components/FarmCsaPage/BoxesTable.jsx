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
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { FarmPropTypes, BoxPropTypes } from "src/types";
import { getCurrency } from "src/i18n";

const useStyles = makeStyles({
  paper: {
    maxWidth: "800px"
  }
});

const TableCell = styled(MuiTableCell)({
  paddingLeft: "16px",
  paddingRight: "8px"
});

function ProduceBox({ box, onEdit, onDelete, isAdminMode }) {
  const { name, content, options } = box;
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
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {options
          .filter((option) => option?.pricePerBox && option.numberOfBoxes)
          .map(({ pricePerBox, numberOfBoxes }, index, { length }) => {
            return (
              <Box display="flex" alignItems="center" key={index}>
                <Box textAlign="right" minWidth="24px">
                  {numberOfBoxes}
                </Box>
                <Box mx="3px">x</Box>
                <Box mr="2px" fontWeight="bold" minWidth="25px">
                  {pricePerBox}
                </Box>
                (= {Number(numberOfBoxes) * Number(pricePerBox)})
                {index < length - 1 && <br />}
              </Box>
            );
          })}
      </TableCell>
    </TableRow>
  );
}
ProduceBox.propTypes = {
  box: BoxPropTypes.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdminMode: PropTypes.bool.isRequired
};
ProduceBox.defaultProps = {
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
    </TableRow>
  );
}
AddPointRow.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default function BoxesTable({
  farm,
  onEdit,
  onDelete,
  onAdd,
  isAdminMode
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { boxes } = farm;

  return (
    <TableContainer className={classes.paper} component={Paper}>
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <TableRow>
            {isAdminMode && (
              <TableCell> {t("pickupPointsPage.editDelete")}</TableCell>
            )}
            <TableCell style={{ minWidth: "200px" }}>
              {t("csaPage.boxName")}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap", minWidth: "200px" }}>
              {t("csaPage.boxContentHeading")}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
              {t("boxesTable.priceHeading", {
                currency: getCurrency(farm.countryCode)
              })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isAdminMode && <AddPointRow onAdd={onAdd} />}

          {[...boxes]
            .sort((a, b) => {
              if (a.name === b.name) return 0;
              if (a.name < b.name) return -1;
              return 1;
            })
            .map((box) => (
              <ProduceBox
                isAdminMode={isAdminMode}
                key={box.objectId}
                box={box}
                onEdit={() => onEdit(box)}
                onDelete={() => onDelete(box.objectId)}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

BoxesTable.propTypes = {
  farm: FarmPropTypes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isAdminMode: PropTypes.bool.isRequired
};
