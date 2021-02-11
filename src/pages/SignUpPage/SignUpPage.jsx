import React, { useState, useCallback } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

import logger from "src/packages/logger";
import ApiClient from "src/packages/api-client";
import AppBar from "src/components/AppBar";
import Dialog from "src/components/Dialog";

import SignUpView from "./SignUpView";

export default function SignUpPage() {
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
      lastName,
      didSubscribeToNewsletter
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
          setErrorMessage("Email je již využíván. Zkuste se přihlásit.");
        } else if (error.code === 125) {
          setErrorMessage("Neplatný email.");
        } else {
          setErrorMessage("Něco se porouchalo. Zkuste opakovat akci později.");
        }
        return;
      }

      try {
        if (didSubscribeToNewsletter) {
          await ApiClient.Newsletter.subscribe(email);
        }
      } catch (error) {
        logger.user(
          "SignUpPage -> Newsletter subscribe failed silently",
          error
        );
      }
    },
    [signUp, history]
  );
  return (
    <>
      <Dialog
        open={Boolean(errorMessage)}
        onClose={closeDialog}
        text={errorMessage}
        primaryButton={{ children: "Pokračovat", onClick: closeDialog }}
      />
      <AppBar />
      <Toolbar />
      <SignUpView isLoading={isLoading} onSubmit={submitHandler} />
    </>
  );
}
