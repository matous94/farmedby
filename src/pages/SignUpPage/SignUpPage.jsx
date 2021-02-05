import React, { useState, useCallback } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { useStoreActions } from "easy-peasy";
import AppBar from "src/components/AppBar";
import Dialog from "src/components/Dialog";

import SignUpView from "./SignUpView";

export default function SignUpPage() {
  // const router = useRouter();
  const signUp = useStoreActions((actions) => actions.signUp);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function closeDialog() {
    setErrorMessage("");
  }

  const submitHandler = useCallback(
    async ({ email, password, name, didSubscribeToNewsletter }) => {
      let user;
      try {
        setIsLoading(true);
        // const userCredential = await auth.createUserWithEmailAndPassword(
        //   email,
        //   password
        // );
        // user = userCredential.user;

        // signUp({ name, email, uid: user.uid });
        // router.push("/create-farm");
      } catch (error) {
        console.log("SignUpPage -> error", error);
        setIsLoading(false);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email je již využíván. Zkuste se přihlásit.");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Neplatný email.");
        } else if (error.code === "auth/weak-password") {
          setErrorMessage("Slabé heslo.");
        } else {
          setErrorMessage("Něco se porouchalo. Zkuste opakovat akci později.");
        }
        return;
      }

      try {
        await user.updateProfile({ displayName: name });
      } catch (error) {
        console.log("SignUpPage -> error", error);
      }
      try {
        if (didSubscribeToNewsletter)
          // await callCloudFunction("subscribeToNewsletter", { email });
      } catch (error) {
        console.log("SignUpPage -> error", error);
      }
    },
    [signUp]
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
