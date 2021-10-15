import { v4 as uuidv4 } from "uuid";
import notes from "../../data/notes.json";
import { useGeneralizedCrudMethods } from "../useGeneralizedCrudMethods";

function useUiNotes() {
  const {
    data,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
  } = useGeneralizedCrudMethods(notes);

  function createNoteUi(title, description) {
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

  function updateNoteUi(
    id,
    title,
    description
  ) {
    if (title || description) {
      const updateObject = {
        title,
        description,
      };
      updateRecord(id, updateObject);
    }
  }

  function deleteNoteUi(id) {
    deleteRecord(id);
  }

  return {
    data,
    error,
    createNoteUi,
    updateNoteUi,
    deleteNoteUi,
  };
}

export default useUiNotes;
