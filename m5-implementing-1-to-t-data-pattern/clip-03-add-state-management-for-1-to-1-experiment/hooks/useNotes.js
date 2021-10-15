import useUiNotes from "./UserInterface/useUiNotes";
import useUiNoteAttributes from "./UserInterface/useUiNoteAttributes";

export const DELAYMS = 1000;

function useNotes() {
  const {
    data: notesData,
    error: notesDataError,
    createNoteUi,
    updateNoteUi,
    deleteNoteUi,
  } = useUiNotes();

  const {
    data: noteAttributesData,
    error: noteAttributesDataError,
    createNoteAttributesUi,
    updateNoteAttributesUi,
    deleteNoteAttributesUi,
  } = useUiNoteAttributes();

  function createNote(title, description) {
    const noteId = createNoteUi(title, description);
    createNoteAttributesUi(noteId, undefined, undefined);
  }

  function updateNote(id, title, description, pinned, important) {
    updateNoteUi(id, title, description);
    updateNoteAttributesUi(id, pinned, important);
  }

  function deleteNote(id) {
    deleteNoteUi(id);
    deleteNoteAttributesUi(id);
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
