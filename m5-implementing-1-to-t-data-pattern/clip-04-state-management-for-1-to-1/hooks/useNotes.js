import useGeneralizedCrudMethods from "./useGeneralizedCrudMethods";
import notes from "../data/notes.json";
import noteAttributes from "../data/noteAttributes";
import { v4 as uuidv4 } from "uuid";

function useNotes() {
  const {
    data: notesData,
    error: notesDataError,
    createRecord: createNotesData,
    updateRecord: updateNotesData,
    deleteRecord: deleteNotesData,
  } = useGeneralizedCrudMethods(notes);

  const {
    data: noteAttributesData,
    error: noteAttributesDataError,
    createRecord: createNoteAttributesData,
    updateRecord: updateNoteAttributesData,
    deleteRecord: deleteNoteAttributesData,
  } = useGeneralizedCrudMethods(noteAttributes);

  function createNote(title, description) {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createNotesData(newNote);
  }

  function updateNote(id, title, description, pinned, important) {
    const updateObject = {
      title,
      description,
    };
    updateNotesData(id, updateObject);

    const noteAttributes = noteAttributesData.find((rec) => rec.noteId === id);
    if (noteAttributes) {
      updateNoteAttributesData(noteAttributes.id, {
        pinned: pinned === undefined ? undefined : pinned ? 1 : 0,
        important: important === undefined ? undefined : important ? 1 : 0,
        updateDate: new Date().toISOString(),
      });
    } else {
      createNoteAttributesData({
        id: uuidv4(),
        noteId: id,
        pinned: pinned === undefined ? undefined : pinned ? 1 : 0,
        important: important === undefined ? undefined : important ? 1 : 0,
        updateDate: new Date().toISOString(),
      });
    }
  }

  function deleteNote(id) {
    deleteNotesData(id);

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
