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
import Dialog from "src/components/Dialog";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import AboutTab from "./AboutTab";
import CsaTab from "./CsaTab";

const useStyles = makeStyles({
  fab: {
    minWidth: "100px"
  }
});

export default function PublicFarmPage() {
  const classes = useStyles();
  const router = useRouter();
  const requestedFarmId = router.query.farmId;
  const farm = useStoreState((state) => state.farm);
  const isUserFarmOwner = farm?.id === requestedFarmId;
  // const [farm, setFarm] = useState(
  //   usersFarm && isUserFarmOwner ? usersFarm : null
  // );
  const [isLoading, setIsLoading] = useState(farm == null);
  const [doesFarmExist, setFarmDoesExist] = useState(true);
  const [isError, setIsError] = useState(false);
  const goToHomePage = () => router.push("/");

  const tabs = {
    about: {
      id: "about",
      label: "Farma",
      Content: (props) => (farm ? <AboutTab farm={farm} {...props} /> : null),
      Icon: FarmIcon,
      as: `/farm/${requestedFarmId}?tab=about`,
      url: "/farm/[farmId]?tab=about"
    },
    csa: {
      id: "csa",
      label: "Bedýnky",
      Content: (props) => (farm ? <CsaTab farm={farm} {...props} /> : null),
      Icon: ProductsIcon,
      as: `/farm/${requestedFarmId}?tab=csa`,
      url: "/farm/[farmId]?tab=csa"
    },
    dropOffPoints: {
      id: "dropOffPoints",
      label: "Odběrová místa",
      Content: (props) => (farm ? <AboutTab farm={farm} {...props} /> : null),
      Icon: MyLocationIcon,
      as: `/farm/${requestedFarmId}?tab=dropOffPoints`,
      url: "/farm/[farmId]?tab=dropOffPoints"
    }
  };
  const selectedTab = router.query.tab || tabs.about.id;

  useEffect(() => {
    if (requestedFarmId == null) return;
    if (farm?.id && farm.id === requestedFarmId) return;

    async function fetchFarm() {
      try {
        const requestedFarm = await dao.getFarm(requestedFarmId);
        if (requestedFarm == null) {
          setFarmDoesExist(false);
          return;
        }
        setFarm(requestedFarm);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        if (error.message === "Missing or insufficient permissions.") {
          setFarmDoesExist(false);
          return;
        }
        setIsError(true);
      }
    }
    fetchFarm();
  }, [requestedFarmId, farm]);

  return (
    <>
      <GenericFailureDialog open={isError} onClose={goToHomePage} />
      {isUserFarmOwner && (
        <Box position="fixed" bottom="24px" right="24px">
          <NextLink
            href="/admin/farm/[farmId]"
            as={`/admin/farm/${requestedFarmId}`}
          >
            <Fab
              component="a"
              className={classes.fab}
              variant="extended"
              color="primary"
            >
              Editovat
            </Fab>
          </NextLink>
        </Box>
      )}
      <Dialog
        open={!doesFarmExist}
        text="Vyžádaná farma neexistuje."
        onClose={goToHomePage}
        primaryButton={{
          onClick: goToHomePage,
          children: "Pokračovat"
        }}
      />
      <FarmView
        selectedTab={selectedTab}
        isLoading={isLoading}
        farm={farm}
        tabs={tabs}
      />
    </>
  );
}
