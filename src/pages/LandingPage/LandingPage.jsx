import React from "react";
import AppBar from "src/components/AppBar";
import ProductHero from "./components/ProductHero";
import CallToAction from "./components/CallToAction";

// based on https://material-ui.com/store/items/onepirate/

export default function LandingPage() {
  return (
    <>
      <AppBar />
      <ProductHero />
      <CallToAction />
    </>
  );
}
