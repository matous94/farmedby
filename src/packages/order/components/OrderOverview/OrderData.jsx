import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { getLanguageCode } from "src/i18n";
import LabelValueDataList from "src/components/LabelValueDataList";
import { OrderPropTypes } from "src/types";

export default function OrderData({ order, sx }) {
  const { t } = useTranslation();
  const items = React.useMemo(
    () => [
      {
        label: t("orderId"),
        value: order.objectId
      },
      {
        label: t("dateOfCreation"),
        value: new Intl.DateTimeFormat(getLanguageCode(), {
          dateStyle: "medium",
          timeStyle: "medium"
        }).format(new Date(order.createdAt))
      },
      {
        label: t("order.status.label"),
        value: order.completed
          ? t("order.status.completed")
          : t("order.status.active")
      }
    ],
    [t, order]
  );

  return <LabelValueDataList heading={t("order")} items={items} sx={sx} />;
}
OrderData.propTypes = {
  order: OrderPropTypes.isRequired,
  sx: PropTypes.shape({})
};
OrderData.defaultProps = {
  sx: undefined
};
