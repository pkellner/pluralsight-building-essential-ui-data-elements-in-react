import useEntityNotes from "./entityMethods/useEntityNotes";
import useEntityNoteAttributes from "./entityMethods/useEntityNoteAttributes";
import useEntityNoteChangeLogs from "./entityMethods/useEntityNoteChangeLogs";
import useEntityTags from "./entityMethods/useEntityTags";
import useEntityNoteOnTags from "./entityMethods/useEntityNoteOnTags";

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

  const {
    data: tagsData,
    error: tagsDataError,
    createTagsAndMerge,
  } = useEntityTags();

  const {
    data: noteOnTagsData,
    error: noteOnTagsDataError,
    updateNoteTags,
    deleteNoteOnTagsByNoteId,
  } = useEntityNoteOnTags();

  // createNote does not support adding important or pinned
  function createNote(title, description, tagIdsIn, tagNamesIn) {
    const noteId = createNoteEntity(title, description);
    createNoteChangeLogsEntity(noteId, "CREATE");
    const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);
    updateNoteTags(tagIds, noteId);
  }

  function updateNote(
    id,
    title,
    description,
    pinned,
    important,
    tagIdsIn,
    tagNamesIn
  ) {
    updateNoteEntity(id, title, description);
    updateNoteAttributesEntity(id, pinned, important);
    createNoteChangeLogsEntity(id, "UPDATE");
    const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);
    updateNoteTags(tagIds, id);
  }

  function deleteNote(id) {
    deleteNoteEntity(id);
    deleteNoteAttributesEntity(id);
    deleteNoteOnTagsByNoteId(id);
  }

  return {
    notesData,
    notesDataError,
    noteAttributesData,
    noteAttributesDataError,
    noteChangeLogsData,
    noteChangeLogsDataError,
    tagsData,
    tagsDataError,
    noteOnTagsData,
    noteOnTagsDataError,

    createNote,
    updateNote,
    deleteNote,
  };
}

export default useNotes;
