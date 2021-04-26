import React from "react";
import Box from "@material-ui/core/Box";

import ProductHeroContent from "./ProductHeroContent";
import heroImageUrl from "./hero2.jpg";

export default function ProductHero() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        color: (theme) => theme.palette.common.white,
        position: "relative",
        minHeight: (theme) =>
          `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        padding: "32px 16px"
      }}
    >
      <ProductHeroContent />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -2,
          backgroundImage: `url(${heroImageUrl})`,
          backgroundColor: "#7fc7d9",
          backgroundPosition: "center"
        }}
      />
    </Box>
  );
}
