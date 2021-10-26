import noteChangeLogs from "../../data/noteChangeLogs.json";
import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";
import { v4 as uuid4 } from "uuid";

function useEntityNoteChangeLogs() {
  const { data, error, createRecord } =
    useGeneralizedCrudMethods(noteChangeLogs);

  function createNoteChangeLogsEntity(noteId, operation) {
    createRecord({
      id: uuid4(),
      noteId,
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
