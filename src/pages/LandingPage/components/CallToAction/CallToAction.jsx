import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import logger from "src/packages/logger";
import ApiClient from "src/packages/api-client";

import imageUrl from "./call-to-action.jpg";

function ProductCTA() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = async (data) => {
    try {
      reset();
      await ApiClient.Newsletter.subscribeToNewsletter(data.email);
    } catch (error) {
      logger.app("Newsletter.subscribe failed silently", error);
    }
  };

  return (
    <Container
      sx={{
        my: ["40px", "60px", "80px"],
        display: "flex"
      }}
      component="section"
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            zIndex: 1
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: (theme) => theme.palette.warning.main,
              padding: ["24px 16px", "48px 24px"]
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              sx={{
                maxWidth: 500,
                marginBottom: "10px"
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                {t("landingPage.workInProgress")}
              </Typography>
              <Typography variant="h5" component="h3">
                {t("landingPage.workInProgress2")}
              </Typography>
              <TextField
                name="email"
                inputRef={register}
                required
                type="email"
                fullWidth
                color="secondary"
                sx={{
                  mt: "24px",
                  mb: "16px"
                }}
                label={t("email")}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  padding: ["12px 20px", "16px 32px"]
                }}
              >
                {t("landingPage.subscribeToNewsletter")}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            display: ["none", null, "inline-block"]
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt="call to action"
            defer
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
