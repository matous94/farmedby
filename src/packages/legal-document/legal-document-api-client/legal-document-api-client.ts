// eslint-disable-next-line import/extensions
import { callCloudFunction } from "src/packages/api-client/requester.js";

interface LegalDocument {
  releaseDate: string;
  lastUpdateDate: string;
  content: string;
}

export function getLegalDocument({
  documentId,
  languageCode
}: {
  documentId: string;
  languageCode: string;
}): Promise<LegalDocument> {
  return callCloudFunction("getLegalDocument", {
    documentId,
    languageCode
  });
}
