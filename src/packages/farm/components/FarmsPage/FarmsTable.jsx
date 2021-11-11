import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { NavigationLink } from "src/components/Link";
import { ProductTypesPropTypes } from "src/types";

// eslint-disable-next-line react/prop-types
const TableCell = ({ sx, ...rest }) => (
  <MuiTableCell
    sx={{
      whiteSpace: "nowrap",
      ...sx
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  />
);

const deliversToPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    city: PropTypes.string,
    postcode: PropTypes.string,
    street: PropTypes.string
  })
).isRequired;

function Farm({ farm, productTypesFilter }) {
  const { objectId, name, productTypes, deliversTo } = farm;
  const { t } = useTranslation();

  const uniqueAndSorted = React.useMemo(() => {
    const sortedByAddress = deliversTo
      .map((location) => `${location.city} ${location.postcode}`)
      .sort((a, b) => {
        if (a === b) return 0;
        if (a < b) return -1;
        return 1;
      });
    return [...new Set(sortedByAddress)];
  }, [deliversTo]);
  const filterTranslations = productTypesFilter.map((type) =>
    t(`productTypes.${type}`)
  );
  return (
    <TableRow>
      <TableCell>
        <NavigationLink to={`/farm/${objectId}`}>{name}</NavigationLink>
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {uniqueAndSorted.map((address, index) => (
          <React.Fragment key={index}>
            {address}
            {index === deliversTo.length - 1 ? null : <br />}
          </React.Fragment>
        ))}
      </TableCell>
      <TableCell>
        {productTypes
          .map((type) => t(`productTypes.${type}`))
          .sort()
          .map((productName, index) => (
            <React.Fragment key={productName}>
              {filterTranslations.includes(productName) ? (
                <b>{productName}</b>
              ) : (
                productName
              )}
              {index !== productTypes.length - 1 && ","}
              <>&nbsp;</>
              {index % 2 === 1 && index <= productTypes.length - 1 && <br />}
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
    deliversTo: deliversToPropTypes
  }).isRequired,
  productTypesFilter: ProductTypesPropTypes.isRequired
};

export default function FarmsTable({ farms, productTypesFilter }) {
  const { t } = useTranslation();

  return (
    <TableContainer
      sx={{
        maxWidth: 800
      }}
      component={Paper}
    >
      <Table size="small" aria-label="pickup points table">
        <TableHead>
          <TableRow>
            <TableCell>{t("farmName")}</TableCell>
            <TableCell>{t("farmsPage.deliversToHeading")}</TableCell>
            <TableCell>{t("farmsPage.producingLabel")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farms.map((farm) => (
            <Farm
              key={farm.objectId}
              farm={farm}
              productTypesFilter={productTypesFilter}
            />
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
      deliversTo: deliversToPropTypes
    })
  ).isRequired,
  productTypesFilter: ProductTypesPropTypes.isRequired
};
