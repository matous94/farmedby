import * as React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AppBar from "src/components/AppBar";
import { useAsync } from "src/packages/hooks";
import ApiClient from "src/packages/api-client";

/* const documentDataStructure = [
  {
    heading: "Odstavec 1", // index+1
    paragraphs: [
      "Odstavec 1.1", // parent.index+1
      "Odstavec 1.2", // parent.index+2
      {
        text: "Odstavec 1.3", // parent.index+3
        paragraphs: [
          "Odstavec 1.3.1" // parent.index+1
        ]
      }
    ]
  }
] */

export default function LegalDocumentPage({ documentId }) {
  const { t } = useTranslation();
  const [document, setDocument] = React.useState(null);
  const documentGetter = useAsync(
    async () => {
      const resolvedDocument = await ApiClient.LegalDocument.getLegalDocument(
        documentId
      );
      setDocument({
        releaseDate: resolvedDocument.releaseDate,
        lastUpdateDate: resolvedDocument.lastUpdateDate,
        content: JSON.parse(resolvedDocument.json)
      });
    },
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
      <Paper
        sx={{
          maxWidth: "800px",
          width: "100%",
          py: "24px",
          px: ["16px", "24px", "32px"],
          mb: ["16px", "24px", "32px"],
          mx: "auto"
        }}
      >
        {documentGetter.isLoading && (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        )}
        {documentGetter.isResolved && (
          <pre>{JSON.stringify({ document }, null, 2)}</pre>
        )}
      </Paper>
    </>
  );
}
LegalDocumentPage.propTypes = {
  documentId: PropTypes.string.isRequired
};
