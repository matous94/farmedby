import React from "react";
// import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Link from "src/components/Link";
// import { useStoreState } from "easy-peasy";

export default function ErrorPage() {
  // const router = useRouter();
  // const isFirstVisitedPage = useStoreState(
  //   (state) => state.appState === AppState.LOADING
  // );

  // useEffect(() => {
  //   if (isFirstVisitedPage) router.push("/");
  // }, [router, isFirstVisitedPage]);

  return (
    <Box p="32px">
      <h1>Něco se porouchalo. Zkuste akci opakovat později.</h1>
      <Link to="/">Zpět do aplikace</Link>
    </Box>
  );
}
