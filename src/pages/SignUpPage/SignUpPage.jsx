import React, { useState, useCallback } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logger from "src/packages/logger";
import ApiClient from "src/packages/api-client";
import AppBar from "src/components/AppBar";
import Dialog from "src/components/Dialog";

import SignUpView from "./SignUpView";

export default function SignUpPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const signUp = useStoreActions((actions) => actions.signUp);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function closeDialog() {
    setErrorMessage("");
  }

  const submitHandler = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName
      // didSubscribeToNewsletter
    }) => {
      try {
        setIsLoading(true);

        const user = await ApiClient.User.signUp({
          email,
          password,
          firstName,
          lastName
        });
        logger.user("User signed up", user);
        signUp(user);
        history.push("/create-farm");
      } catch (error) {
        logger.user("SignUpPage -> signUp failed:", error);
        setIsLoading(false);
        if (error.code === 202) {
          setErrorMessage(t("signUpPage.emailInUse"));
        } else if (error.code === 125) {
          setErrorMessage(t("signUpPage.invalidEmail"));
        } else {
          setErrorMessage(t("genericFailureMessage"));
        }
        // return;
      }

      // try {
      //   if (didSubscribeToNewsletter) {
      //     await ApiClient.Newsletter.subscribe(email);
      //   }
      // } catch (error) {
      //   logger.user(
      //     "SignUpPage -> Newsletter subscribe failed silently",
      //     error
      //   );
      // }
    },
    [signUp, history, t]
  );
  return (
    <>
      <Dialog
        open={Boolean(errorMessage)}
        onClose={closeDialog}
        text={errorMessage}
        primaryButton={{ children: t("Continue"), onClick: closeDialog }}
      />
      <AppBar />
      <Toolbar />
      <SignUpView isLoading={isLoading} onSubmit={submitHandler} />
    </>
  );
}
