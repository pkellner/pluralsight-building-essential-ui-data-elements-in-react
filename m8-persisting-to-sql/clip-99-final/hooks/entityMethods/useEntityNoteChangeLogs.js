import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";
import { v4 as uuid4 } from "uuid";

function useEntityNoteChangeLogs(url, errorNotificationFn) {
  const { data, error, createRecord } =
    useGeneralizedCrudMethods(url, errorNotificationFn);

  function createNoteChangeLogsEntity(noteId, operation) {
    createRecord({
      id: uuid4(),
      noteId: noteId,
      operation,
      changeDate: new Date().toISOString(),
    });
  }

  return {
    data,
    error,
    createNoteChangeLogsEntity,
  };
}

export default useEntityNoteChangeLogs;
