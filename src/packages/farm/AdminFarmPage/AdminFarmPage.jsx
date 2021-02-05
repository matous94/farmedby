import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useStoreState } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import ProductsIcon from "src/icons/ProductsIcon";
import FarmIcon from "src/icons/FarmIcon";
import FarmView from "src/packages/farm/components/FarmView";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import AboutTab from "./AboutTab";
import CsaTab from "./CsaTab";

const useStyles = makeStyles({
  fab: {
    minWidth: "100px"
  }
});

export default function AdminFarmPage() {
  const classes = useStyles();
  const router = useRouter();
  const requestedFarmId = router.query.farmId;
  const farm = useStoreState((state) => state.farm);

  const isUserFarmOwner = farm?.id === requestedFarmId;

  if (!isUserFarmOwner) {
    router.push("/sign-in");
    return null;
  }

  const goToHomePage = () => router.push("/");

  const tabs = {
    about: {
      id: "about",
      label: "Farma",
      Content: (props) => (farm ? <AboutTab farm={farm} {...props} /> : null),
      Icon: FarmIcon,
      as: `/admin/farm/${requestedFarmId}?tab=about`,
      url: "/admin/farm/[farmId]?tab=about"
    },
    csa: {
      id: "csa",
      label: "Bedýnky",
      Content: (props) => (farm ? <CsaTab farm={farm} {...props} /> : null),
      Icon: ProductsIcon,
      as: `/admin/farm/${requestedFarmId}?tab=csa`,
      url: "/admin/farm/[farmId]?tab=csa"
    },
    dropOffPoints: {
      id: "dropOffPoints",
      label: "Odběrová místa",
      Content: (props) => (farm ? <AboutTab farm={farm} {...props} /> : null),
      Icon: MyLocationIcon,
      as: `/admin/farm/${requestedFarmId}?tab=dropOffPoints`,
      url: "/admin/farm/[farmId]?tab=dropOffPoints"
    }
  };
  const selectedTab = router.query.tab || tabs.about.id;

  return (
    <>
      <GenericFailureDialog open={false} onClose={goToHomePage} />
      <FarmView
        selectedTab={selectedTab}
        isLoading={false}
        farm={farm}
        tabs={tabs}
      />
      <Box position="fixed" bottom="24px" right="24px">
        <Fab
          style={{ marginRight: "16px" }}
          size="medium"
          className={classes.fab}
          component="a"
          variant="extended"
          color="primary"
        >
          Uložit
        </Fab>
        <NextLink href="/farm/[farmId]" as={`/farm/${requestedFarmId}`}>
          <Fab
            size="medium"
            className={classes.fab}
            component="a"
            variant="extended"
            color="secondary"
          >
            Náhled
          </Fab>
        </NextLink>
      </Box>
    </>
  );
}
