import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";
import notes from "../../data/notes.json";
import { v4 as uuidv4 } from "uuid";

function useEntityNotes() {
  const {
    data,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useGeneralizedCrudMethods(notes);

  function createNoteEntity(
    title,
    description
  ) {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createRecord(newNote);
  }

  function updateNoteEntity(
    id,
    title,
    description
  ) {
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
