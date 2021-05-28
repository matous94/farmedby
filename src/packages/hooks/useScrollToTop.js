import * as React from "react";
import { useLocation } from "react-router-dom";
import { useStoreState } from "easy-peasy";

import { selectors } from "src/store";

export default function useScrollToTop() {
  const { pathname } = useLocation();
  const isAdminMode = useStoreState(selectors.getAdminMode);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, isAdminMode]);
}
