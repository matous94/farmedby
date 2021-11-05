import * as React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreActions, useStoreState } from "easy-peasy";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { SortByOrdersEnum } from "src/types";
import { selectors } from "src/store";

export default function SortBy({ sx }) {
  const { t } = useTranslation();
  const sortBy = useStoreState(selectors.order.getSortByOrders);
  const setSortByOrders = useStoreActions(
    (actions) => actions.order.setSortByOrders
  );

  return (
    <FormControl sx={sx} component="fieldset">
      <FormLabel component="legend">{t("sortBy")}</FormLabel>
      <RadioGroup
        row
        aria-label="sortBy"
        name="row-radio-buttons-group"
        value={sortBy}
        onChange={(e) => setSortByOrders(e.target.value)}
      >
        <FormControlLabel
          value={SortByOrdersEnum.createdAt}
          control={<Radio />}
          label={t("order.sortByOrders.createdAt.label")}
        />
        <FormControlLabel
          value={SortByOrdersEnum.pickupPointName}
          control={<Radio />}
          label={t("order.sortByOrders.pickupPointName.label")}
        />
      </RadioGroup>
    </FormControl>
  );
}
SortBy.propTypes = {
  sx: PropTypes.shape({})
};
SortBy.defaultProps = {
  sx: undefined
};
