import { v4 as uuidv4 } from "uuid";
import noteOnTags from "../../data/noteOnTags.json";
import useGeneralizedCrudMethods from "../useGeneralizedCrudMethods";

function useEntityNoteOnTags() {
  const { data, error, createRecord, deleteRecord } =
    useGeneralizedCrudMethods(noteOnTags);

  function updateNoteTags(tagIdsToSet, noteId) {
    if (!tagIdsToSet || !noteId) {
      return;
    }

    // create array of ints of passed in tags
    const tagIdsOnNote = data
      .filter((rec) => rec.noteId === noteId)
      .map((rec) => rec.tagId);

    // tagIds that we need to add to the note
    const tagIdsToAdd = tagIdsToSet.filter(
      (tagId) => !tagIdsOnNote.includes(tagId)
    );

    const tagIdsToDelete = tagIdsOnNote.filter(function (tagId) {
      return !tagIds.includes(tagId);
    });

    tagIdsToAdd.forEach((tagId) => {
      createRecord({
        id: uuidv4(),
        noteId,
        tagId,
        createdAt: new Date().toISOString(),
      });
    });

    tagIdsToDelete.forEach((tagId) => {
      deleteRecord(tagId);
    });
  }

  return {
    data,
    error,
    updateNoteTags,
  };
}

export default useEntityNoteOnTags;
