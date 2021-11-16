import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityNoteOnTags(url, errorNotificationFn) {
  const { data, error, createRecord, deleteRecord } = useGeneralizedCrudMethods(
    url,
    errorNotificationFn
  );
  function updateNoteTags(tagIdsToSet, noteId) {
    if (!tagIdsToSet || !noteId) {
      return;
    }
    const tagIdsOnNote = data
      .filter((rec) => rec.noteId === noteId)
      .map((rec) => rec.tagId);
    const tagIdsToAdd = tagIdsToSet.filter(
      (tagId) => !tagIdsOnNote.includes(tagId)
    );
    const tagIdsToDelete = tagIdsOnNote.filter(
      (tagId) => !tagIdsToSet.includes(tagId)
    );
    tagIdsToAdd.forEach((tagId) => {
      createRecord({
        id: uuidv4(),
        noteId,
        tagId,
        createdAt: new Date().toISOString(),
      });
    });
    const noteOnTagRecIdsToDelete = data
      .filter(
        (rec) => rec.noteId === noteId && tagIdsToDelete.includes(rec.tagId)
      )
      .map((rec) => rec.id);
    noteOnTagRecIdsToDelete.forEach((id) => deleteRecord(id));
  }
  function deleteNoteOnTagsByNoteId(noteId) {
    data.forEach((rec) => {
      if (rec.noteId === noteId) {
        deleteRecord(rec.id);
      }
    });
  }
  return { data, error, updateNoteTags, deleteNoteOnTagsByNoteId };
}

export default useEntityNoteOnTags;
