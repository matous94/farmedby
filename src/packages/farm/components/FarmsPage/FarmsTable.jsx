import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles, styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Link from "src/components/Link";
import { ProductTypesPropTypes } from "src/types";

const useStyles = makeStyles({
  paper: {
    maxWidth: 800
  }
});

const TableCell = styled(MuiTableCell)({
  paddingLeft: "16px",
  paddingRight: "8px",
  whiteSpace: "nowrap"
});

function Farm({ farm }) {
  const { objectId, name, productTypes, deliversTo } = farm;
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>
        <Link to={`/farm/${objectId}`}>{name}</Link>
      </TableCell>
      <TableCell>
        {productTypes
          .map((type) => t(`productTypes.${type}`))
          .sort()
          .map((productName, index) => (
            <React.Fragment key={productName}>
              {productName}
              {index !== productTypes.length - 1 && ","}
              <>&nbsp;</>
              {index % 2 === 1 && index <= productTypes.length - 1 && <br />}
            </React.Fragment>
          ))}
      </TableCell>
      <TableCell>
        {deliversTo.map((city, index) => (
          <React.Fragment key={city}>
            {city}
            {index <= deliversTo.length - 1 && <br />}
          </React.Fragment>
        ))}
      </TableCell>
    </TableRow>
  );
}
Farm.propTypes = {
  farm: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    productTypes: ProductTypesPropTypes.isRequired,
    deliversTo: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default function FarmsTable({ farms }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableContainer className={classes.paper} component={Paper}>
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <TableRow>
            <TableCell>{t("farmName")}</TableCell>
            <TableCell>{t("farmsTable.producingHeading")}</TableCell>
            <TableCell>{t("farmsTable.deliversToHeading")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farms.map((farm) => (
            <Farm key={farm.objectId} farm={farm} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

FarmsTable.propTypes = {
  farms: PropTypes.arrayOf(
    PropTypes.shape({
      objectId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      productTypes: ProductTypesPropTypes.isRequired,
      deliversTo: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};
