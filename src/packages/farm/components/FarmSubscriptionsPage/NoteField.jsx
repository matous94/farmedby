import React from "react";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStoreActions, useStoreState } from "easy-peasy";
import { selectors } from "src/store";

function NoteField() {
  const { t } = useTranslation();
  const translationPrefix = "subscriptionsPage.note.placeholder.line";
  const line1 = t(translationPrefix + 1);
  const line2 = t(translationPrefix + 2);
  const line3 = t(translationPrefix + 3);

  const note = useStoreState(selectors.orderDraft.getNote);
  const setNote = useStoreActions((actions) => actions.orderDraft.setNote);
  return (
    <TextareaAutosize
      name="note"
      minRows={6}
      style={{ maxWidth: "500px", width: "100%", padding: "8px" }}
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder={`${line1}\n${line2}\n${line3}`}
    />
  );
}

export default React.memo(NoteField);
