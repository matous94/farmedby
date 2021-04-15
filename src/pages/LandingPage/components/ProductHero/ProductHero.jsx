import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import ProductHeroContent from "./ProductHeroContent";
import heroImageUrl from "./hero.jpg";

export default function ProductHero() {
  return (
    <Box
      component="section"
      sx={{
        color: (theme) => theme.palette.common.white,
        position: "relative",
        minHeight: ["75vh", "500px"],
        maxHeight: ["600px", "1300px"]
      }}
    >
      <Container
        sx={{
          padding: ["16px", "32px 16px"]
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
            backgroundColor: (theme) => theme.palette.common.black,
            opacity: 0.5,
            zIndex: -1
          }}
        />
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
      </Container>
    </Box>
  );
}
