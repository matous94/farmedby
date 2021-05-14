import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useStoreState } from "easy-peasy";
import Box from "@material-ui/core/Box";
import { getLanguageCode } from "src/i18n";

import { selectors } from "src/store";
import LabelValueData from "src/components/LabelValueData";
import {
  OrderPreviewPropTypes,
  SortByOrdersPropTypes,
  SortByOrdersEnum
} from "src/types";

function OrderPreview({ farmId, order, sortBy, mb }) {
  const { t } = useTranslation();

  const createdAtData = (
    <LabelValueData
      label={t("dateOfCreation")}
      value={new Intl.DateTimeFormat(getLanguageCode(), {
        dateStyle: "short",
        timeStyle: "short"
      }).format(new Date(order.createdAt))}
      sx={{
        mb: sortBy === SortByOrdersEnum.createdAt ? "6px" : "0px",
        "& > p": {
          fontWeight: sortBy === SortByOrdersEnum.createdAt ? 700 : 400
        }
      }}
    />
  );

  const pickupPointData = (
    <LabelValueData
      label={t("pickupPoint")}
      value={order.pickupPointName}
      sx={{
        mb: sortBy === SortByOrdersEnum.pickupPointName ? "6px" : "0px",
        "& > p": {
          fontWeight: sortBy === SortByOrdersEnum.pickupPointName ? 700 : 400
        }
      }}
    />
  );

  return (
    <Box sx={{ width: "100%", mb }}>
      {sortBy === SortByOrdersEnum.createdAt ? createdAtData : pickupPointData}
      <LabelValueData
        label={t("orderId")}
        value={order.objectId}
        to={`/farm/${farmId}/order/${order.objectId}`}
        sx={{
          mb: "6px"
        }}
      />
      {sortBy === SortByOrdersEnum.createdAt ? pickupPointData : createdAtData}
    </Box>
  );
}
OrderPreview.propTypes = {
  order: OrderPreviewPropTypes.isRequired,
  sortBy: SortByOrdersPropTypes.isRequired,
  mb: PropTypes.string.isRequired,
  farmId: PropTypes.string.isRequired
};

function OrderPreviewList({ orders, farmId }) {
  const sortBy = useStoreState(selectors.order.getSortByOrders);
  const sortedOrders = orders.sort((a, b) => {
    if (a[sortBy] === b[sortBy]) {
      return 0;
    }
    if (a[sortBy] > b[sortBy]) {
      return sortBy === SortByOrdersEnum.createdAt ? -1 : 1;
    }
    return sortBy === SortByOrdersEnum.createdAt ? 1 : -1;
  });

  return sortedOrders.map((order, index) => (
    <OrderPreview
      farmId={farmId}
      key={order.objectId}
      order={order}
      sortBy={sortBy}
      mb={index + 1 === sortedOrders.length ? "0px" : "24px"}
    />
  ));
}
OrderPreviewList.propTypes = {
  orders: PropTypes.arrayOf(OrderPreviewPropTypes).isRequired,
  farmId: PropTypes.string.isRequired
};

export default React.memo(OrderPreviewList);
