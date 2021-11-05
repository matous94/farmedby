import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FarmPropTypes } from "src/types";
import { createAddress } from "src/packages/utils";
import LabelValueDataList from "src/components/LabelValueDataList";

export default function FarmView({ farm }) {
  const {
    about,
    addressLevel1,
    city,
    countryCode,
    email,
    phoneNumber,
    street,
    postcode,
    productTypes,
    webUrl
  } = farm;
  const { t } = useTranslation();
  const producing = productTypes
    .map((type) => t(`productTypes.${type}`))
    .join(", ");

  const aboutAsParagraphs = about.split("\n");
  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <LabelValueDataList
        items={[
          {
            label: t("producing"),
            value: producing
          },
          {
            label: t("address"),
            value: createAddress({
              addressLevel1,
              city,
              countryCode,
              street,
              postcode
            }).full
          },
          {
            label: t("email"),
            value: email
          },
          {
            label: t("phoneNumber"),
            value: phoneNumber
          },
          {
            label: t("webAddress"),
            href: webUrl
          }
        ]}
      />
      {about && (
        <>
          <Typography sx={{ marginBottom: "8px", mt: "16px" }} variant="h4">
            {t("aboutFarm")}
          </Typography>
          {aboutAsParagraphs.map((paragraph, index) =>
            paragraph === "" ? (
              <br key={index} />
            ) : (
              <Typography
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                variant="body1"
              >
                {paragraph}
              </Typography>
            )
          )}
        </>
      )}
    </Box>
  );
}
FarmView.propTypes = {
  farm: FarmPropTypes.isRequired
};
