import * as React from "react";
import { useTranslation } from "react-i18next";
import Markdown from "markdown-to-jsx";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import AppBar from "src/components/AppBar";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";
import GenericFailureDialog from "src/components/GenericFailureDialog";
import { getLanguageCode } from "src/i18n";

interface Props {
  documentId: string;
}

export default function LegalDocumentPage({ documentId }: Props): JSX.Element {
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
              window.location.href = "/";
            }}
          />
          {documentGetter.isLoading && (
            <CircularProgress sx={{ display: "block", mx: "auto" }} />
          )}
          {documentGetter.isResolved && documentGetter.result && (
            <>
              <Typography>
                {t("legalDocument.releaseDate")}:{" "}
                {dayjs(documentGetter.result.releaseDate).format("L")}
              </Typography>
              <Typography>
                {t("legalDocument.lastUpdateDate")}:{" "}
                {dayjs(documentGetter.result.lastUpdateDate).format("L")}
              </Typography>
              <Markdown>{documentGetter.result.content}</Markdown>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
}
