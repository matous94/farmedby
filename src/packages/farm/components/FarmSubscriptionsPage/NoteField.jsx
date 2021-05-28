import React from "react";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useStoreActions, useStoreState } from "easy-peasy";
import { selectors } from "src/store";

function NoteField() {
  const { t } = useTranslation();
  const note = useStoreState(selectors.orderDraft.getNote);
  const setNote = useStoreActions((actions) => actions.orderDraft.setNote);
  return (
    <TextareaAutosize
      name="note"
      minRows={7}
      style={{ maxWidth: "500px", width: "100%", padding: "8px" }}
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder={t("subscriptionsPage.note.placeholder")}
    />
  );
}

export default React.memo(NoteField);
