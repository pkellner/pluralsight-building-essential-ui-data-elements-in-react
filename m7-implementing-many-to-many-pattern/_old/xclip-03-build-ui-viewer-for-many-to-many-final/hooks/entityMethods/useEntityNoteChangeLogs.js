import { v4 as uuidv4 } from "uuid";
import noteChangeLogs from "../../data/noteChangeLogs.json";
import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";

function useEntityNoteChangeLogs() {
  const { data, error, createRecord } =
    useGeneralizedCrudMethods(noteChangeLogs);

  function createNoteChangeLogsEntity(noteId, operation) {
    createRecord({
      id: uuidv4(),
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
