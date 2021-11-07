import useEntityNotes from "./EntityMethods/useEntityNotes";
import useEntityNoteAttributes from "./EntityMethods/useEntityNoteAttributes";

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
    updateNoteAttributesEntity,
    deleteNoteAttributesEntity,
  } = useEntityNoteAttributes();

  function createNote(title, description) {
    createNoteEntity(title, description);
  }

  function updateNote(
    id,
    title,
    description,
    pinned,
    important
  ) {
    updateNoteEntity(id, title, description);
    updateNoteAttributesEntity(
      id,
      pinned,
      important
    );
  }

  function deleteNote(id) {
    deleteNoteEntity(id);
    deleteNoteAttributesEntity(id);
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
