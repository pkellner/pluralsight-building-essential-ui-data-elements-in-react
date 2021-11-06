import useEntityNotes from "./entityMethods/useEntityNotes";
import useEntityNoteAttributes from "./entityMethods/useEntityNoteAttributes";
import useEntityNoteChangeLogs from "./entityMethods/useEntityNoteChangeLogs";

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

  const {
    data: noteChangeLogsData,
    error: noteChangeLogsDataError,
    createNoteChangeLogsEntity,
  } = useEntityNoteChangeLogs();

  function createNote(title, description) {
    // could create Id noteId here and pass in to createNoteEntity as alternative
    const noteId = createNoteEntity(title, description);
    createNoteChangeLogsEntity(noteId, "CREATE");
  }

  function updateNote(id, title, description, pinned, important) {
    updateNoteEntity(id, title, description);
    updateNoteAttributesEntity(id, pinned, important);
    createNoteChangeLogsEntity(id, "UPDATE");
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
    noteChangeLogsData,
    noteChangeLogsDataError,
    createNote,
    updateNote,
    deleteNote,
  };
}

export default useNotes;
