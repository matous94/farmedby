import * as React from "react";

import LoadingOverlay from "src/components/LoadingOverlay";
import AppBar from "src/components/AppBar";

export default function LoadingScreen() {
  return (
    <>
      <AppBar onlyLogo />
      <LoadingOverlay />
    </>
  );
}
