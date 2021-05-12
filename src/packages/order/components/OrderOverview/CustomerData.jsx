import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import LabelValueDataList from "src/components/LabelValueDataList";

export default function CustomerData({ customer, note }) {
  const { t } = useTranslation();

  const items = React.useMemo(() => {
    const noteAsParagraphs = note.split("\n");
    const noteWithNewlines = (
      <>
        {noteAsParagraphs.map((paragraph, index) => (
          <span style={{ display: "block" }} key={index}>
            {paragraph}
          </span>
        ))}
      </>
    );
    const result = [
      {
        label: t("name"),
        value: customer.name
      },
      {
        label: t("email"),
        value: customer.email
      },
      { label: t("phoneNumber"), value: customer.phoneNumber }
    ];
    if (note) {
      result.push({
        label: t("note"),
        value: noteWithNewlines,
        multiline: true
      });
    }
    return result;
  }, [t, customer, note]);

  return <LabelValueDataList heading={t("customer")} items={items} />;
}
CustomerData.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string
  }).isRequired,
  note: PropTypes.string.isRequired
};
