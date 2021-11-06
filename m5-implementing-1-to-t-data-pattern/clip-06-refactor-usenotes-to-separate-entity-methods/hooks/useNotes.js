import useGeneralizedCrudMethods from "./useGeneralizedCrudMethods";
import notes from "../data/notes.json";
import noteAttributes from "../data/noteAttributes";
import { v4 as uuidv4 } from "uuid";
import useEntityNotes from "./entityMethods/useEntityNotes";

function useNotes() {
  const {
    data: notesData,
    error: notesDataError,
    createNoteEntity,
    updateNoteEntity,
    deleteNoteEntity,
  } = useEntityNotes();

  const {
    data: noteAttributesData,
    error: noteAttributesDataError,
    createRecord: createNoteAttributesData,
    updateRecord: updateNoteAttributesData,
    deleteRecord: deleteNoteAttributesData,
  } = useGeneralizedCrudMethods(noteAttributes);

  function createNote(title, description) {
    createNoteEntity(title, description);
  }

  function updateNote(id, title, description, pinned, important) {
    updateNoteEntity(id, title, description);

    const noteAttributes = noteAttributesData.find((rec) => rec.noteId === id);
    if (noteAttributes) {
      updateNoteAttributesData(noteAttributes.id, {
        pinned: pinned ===undefined ? undefined : Number(pinned),
        important: important === undefined ? undefined : Number(important),
        updateDate: new Date().toISOString(),
      });
    } else {
      createNoteAttributesData(noteAttributes.id, {
        id: uuidv4(),
        noteId: id,
        pinned: pinned ===undefined ? undefined : Number(pinned),
        important: important === undefined ? undefined : Number(important),
        updateDate: new Date().toISOString(),
      });
    }
  }

  function deleteNote(id) {
    deleteNoteEntity(id);

    noteAttributesData
      .filter((rec) => rec.noteId === id)
      .forEach((rec) => deleteNoteAttributesData(rec.id));
  }

  return {
    notesData,
    notesDataError,
    noteAttributesData,
    noteAttributesDataError,
    createNote,
    updateNote,
    deleteNote,
  };
}

export default useNotes;
