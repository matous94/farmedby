import React from "react";
import AppBar from "src/components/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProductHero from "./components/ProductHero";
import ProductCTA from "./components/CallToAction";

// based on https://material-ui.com/store/items/onepirate/

export default function LandingPage() {
  return (
    <>
      <AppBar />
      <Toolbar />
      <ProductHero />
      <ProductCTA />
    </>
  );
}
