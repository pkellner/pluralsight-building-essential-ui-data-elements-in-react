import { v4 as uuidv4 } from "uuid";
import noteChangeLogs from "../../data/noteChangeLogs.json";
import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";

function useEntityNoteChangeLogs() {
  const { data, error, createRecord, updateRecord, deleteRecord } =
    useGeneralizedCrudMethods(noteChangeLogs);

  function createNoteChangeLogsEntity(noteId, operation) {
    createRecord({
      id: uuidv4(),
      noteId: noteId,
      operation,
      changeDate: new Date().toISOString(),
    });
  }

  // function updateNoteAttributesEntity(noteId, pinned, important) {
  //
  // }
  //
  // function deleteNoteAttributesEntity(id) {
  //   data
  //     .filter((rec) => rec.noteId === id)
  //     .forEach((rec) => deleteRecord(rec.id));
  // }

  return {
    data,
    error,
    createNoteChangeLogsEntity,
    // deleteNoteAttributesEntity,
  };
}

export default useEntityNoteChangeLogs;
