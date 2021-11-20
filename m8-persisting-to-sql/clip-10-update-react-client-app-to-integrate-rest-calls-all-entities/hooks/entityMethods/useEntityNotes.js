import { v4 as uuidv4 } from "uuid";
import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";

function useEntityNotes(url, errorNotificationFn) {
  const { data, error, createRecord, updateRecord, deleteRecord } =
    useGeneralizedCrudMethods(url, errorNotificationFn);

  function createNoteEntity(title, description) {
    const noteId = uuidv4();
    const newNote = {
      id: noteId,
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createRecord(newNote);
    return noteId;
  }

  function updateNoteEntity(id, title, description) {
    const updateObject = {
      title,
      description,
    };
    updateRecord(id, updateObject);
  }

  function deleteNoteEntity(id) {
    deleteRecord(id);
  }

  return {
    data,
    error,
    createNoteEntity,
    updateNoteEntity,
    deleteNoteEntity,
  };
}

export default useEntityNotes;
