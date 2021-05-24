import * as React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Markdown from "markdown-to-jsx";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AppBar from "src/components/AppBar";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import { getLanguageCode } from "src/i18n";

export default function LegalDocumentPage({ documentId }) {
  const { t } = useTranslation();
  const documentGetter = useAsync(
    () =>
      ApiClient.LegalDocument.getLegalDocument({
        documentId,
        languageCode: getLanguageCode()
      }),
    { runOnMount: true, functionName: "getDocument" }
  );

  return (
    <>
      <AppBar />
      <Typography
        sx={{ my: "24px" }}
        align="center"
        color="secondary"
        variant="h3"
      >
        {t(`legalDocument.${documentId}.heading`)}
      </Typography>
      <Box
        sx={{
          maxWidth: "800px",
          width: "100%",
          px: "12px",
          mx: "auto"
        }}
      >
        <Paper
          sx={{
            maxWidth: "800px",
            width: "100%",
            pt: "12px",
            pb: "24px",
            px: ["12px", "24px", "32px"],
            mb: "64px"
          }}
        >
          <GenericFailureDialog
            isOpen={documentGetter.hasError}
            onClose={() => {
              window.location = "/";
            }}
          />
          {documentGetter.isLoading && (
            <CircularProgress sx={{ display: "block", mx: "auto" }} />
          )}
          {documentGetter.isResolved && (
            <Markdown>{documentGetter.result.content}</Markdown>
          )}
        </Paper>
      </Box>
    </>
  );
}
LegalDocumentPage.propTypes = {
  documentId: PropTypes.string.isRequired
};
