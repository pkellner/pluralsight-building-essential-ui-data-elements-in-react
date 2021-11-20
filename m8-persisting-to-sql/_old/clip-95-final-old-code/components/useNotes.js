import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGeneralizedCrudMethods } from "./useGeneralizedCrudMethods";

import notes from "../data/notes.json";
import noteAttributes from "../data/noteAttributes.json";
import noteChangeLogs from "../data/noteChangeLogs.json";
import tags from "../data/tags.json";
import noteOnTags from "../data/noteOnTags.json";

// import useNotesModal from "./useNotesModal";

export const DELAYMS = 2000;

function useNotes(errorNotificationFn) {
  function mapObj(arr) {
    return arr.map((rec) => ({ ...rec }));
  }

  const {
    data: notesData,
    error: notesDataError,
    createRecord: createNotesData,
    updateRecord: updateNotesData,
    deleteRecord: deleteNotesData,
  } = useGeneralizedCrudMethods(
    mapObj(notes),
    "/api/notes",
    //undefined,
    errorNotificationFn
  );

  const {
    data: noteAttributesData,
    error: noteAttributesDataError,
    createRecord: createNoteAttributesData,
    updateRecord: updateNoteAttributesData,
    deleteRecord: deleteNoteAttributesData,
  } = useGeneralizedCrudMethods(
    mapObj(noteAttributes),
    "/api/noteAttributes",
    errorNotificationFn
  );

  const {
    data: noteChangeLogsData,
    error: noteChangeLogsDataError,
    createRecord: createNoteChangeLogData,
    deleteRecord: deleteNoteChangeLogData,
  } = useGeneralizedCrudMethods(
    mapObj(noteChangeLogs),
    "/api/noteChangeLogs",
    errorNotificationFn
  );

  const {
    data: tagsData,
    error: tagsDataError,
    createRecord: createTagsData,
  } = useGeneralizedCrudMethods(mapObj(tags), "/api/tags", errorNotificationFn);

  const {
    data: noteOnTagsData,
    error: noteOnTagsDataError,
    createRecord: createNoteOnTagsData,
    deleteRecord: deleteNoteOnTagsData,
  } = useGeneralizedCrudMethods(
    mapObj(noteOnTags),
    "/api/noteOnTags",
    errorNotificationFn
  );

  function convertTagIdsAndNewTagsToArrays(tagIdsIn, tagNamesIn) {
    const tagIds = tagIdsIn ? [...tagIdsIn] : [];
    const tagNames = [];
    const tagsNamesAllUppercase = tagsData?.map((r) => r.tagName.toUpperCase());
    tagNamesIn
      ?.filter((rec) => {
        return !(!rec || rec.trim().length === 0);
      })
      .map(function (tag) {
        if (tagsNamesAllUppercase.includes(tag.toUpperCase())) {
          // could be made simpler, but want to make sure that mixed case is respected but not added again
          const tagNameValue = tagsNamesAllUppercase.find(
            (r) => r === tag.toUpperCase()
          );
          const id = tagsData?.find(
            (r) => r.tagName.toUpperCase() === tagNameValue
          ).id;
          tagIds.push(id);
        } else {
          if (
            !tagNames.map((a) => a.toUpperCase()).includes(tag.toUpperCase())
          ) {
            tagNames.push(tag);
          }
        }
      });
    return { tagIds, tagNames };
  }

  function updateNoteTags(tagIdsIn, tagNamesIn, noteId) {
    const { tagIds, tagNames } = convertTagIdsAndNewTagsToArrays(
      tagIdsIn,
      tagNamesIn
    );

    const tagIdsExisting = noteOnTagsData
      .filter((t) => t.noteId === noteId)
      .map(function (rec) {
        return rec.tagId;
      });

    // adds just the new tags record and the associated noteOnTags record
    let tagsNew = [];
    let noteOnTagsNew = [];

    tagNames.forEach((tagName) => {
      const tagIdNew = uuidv4();
      const newTag = {
        id: tagIdNew,
        tagName: tagName,
      };
      tagsNew.push(newTag);
      noteOnTagsNew.push({
        id: uuidv4(),
        noteId: noteId,
        tagId: tagIdNew,
        createdAt: new Date().toISOString(),
      });
    });

    // tagIds that we need to ad to the note
    tagIds
      .filter(function (tagId) {
        return !tagIdsExisting.includes(tagId);
      })
      .forEach((tagId) => {
        noteOnTagsNew.push({
          id: uuidv4(),
          noteId: noteId,
          tagId: tagId,
          createdAt: new Date().toISOString(),
        });
      });

    const tagIdsToDelete = tagIdsExisting.filter(function (tagId) {
      return !tagIds.includes(tagId);
    });

    tagsNew.forEach((rec) => {
      createTagsData(rec);
    });

    noteOnTagsNew.forEach((rec) => {
      createNoteOnTagsData(rec);
    });

    tagIdsToDelete.forEach((id) => {
      const noteOnTagRec = noteOnTagsData.find((rec) => {
        return rec.tagId === id && rec.noteId === noteId;
      });
      deleteNoteOnTagsData(noteOnTagRec.id);
    });
  }

  function createNote(title, description, tagIdsIn, tagNamesIn) {
    const noteIdNew = uuidv4();
    const newNote = {
      id: noteIdNew,
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createNotesData(newNote);

    updateNoteTags(tagIdsIn, tagNamesIn, noteIdNew);

    // mention transaction logging here not done
    createNoteChangeLogData({
      id: uuidv4(),
      noteId: noteIdNew,
      operation: "CREATE",
      changeDate: new Date().toISOString(),
    });
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
    let updatedFlag = false;

    if (title || description) {
      const updateObject = {
        title,
        description,
      };
      updateNotesData(id, updateObject);
      updatedFlag = true;
    }

    if (pinned != undefined && important != undefined) {
      const noteAttributes = noteAttributesData.find(
        (rec) => rec.noteId === id
      );
      if (noteAttributes) {
        updateNoteAttributesData(noteAttributes.id, {
          pinned: pinned ? 1 : 0,
          important: important ? 1 : 0,
          updateDate: new Date().toISOString(),
        });
      } else {
        createNoteAttributesData({
          id: uuidv4(),
          noteId: id,
          pinned: pinned ? 1 : 0,
          important: important ? 1 : 0,
          updateDate: new Date().toISOString(),
        });
      }
      updatedFlag = true;
    }

    if (tagIdsIn && tagNamesIn) {
      updateNoteTags(tagIdsIn, tagNamesIn, id);
      updatedFlag = true;
    }

    if (updatedFlag === true) {
      createNoteChangeLogData({
        id: uuidv4(),
        noteId: id,
        operation: "UPDATE",
        changeDate: new Date().toISOString(),
      });
    }
  }

  function deleteNote(id) {
    noteAttributesData
      .filter((rec) => rec.noteId === id)
      .forEach((rec) => deleteNoteAttributesData(rec.id));
    noteChangeLogsData
      .filter((rec) => rec.noteId === id)
      .forEach((rec) => deleteNoteChangeLogData(rec.id));
    noteOnTagsData
      .filter((rec) => rec.noteId === id)
      .forEach((rec) => deleteNoteOnTagsData(rec.id));
    deleteNotesData(id);
  }

  return {
    notesData,
    notesDataError,
    noteChangeLogsData,
    tagsData,
    noteOnTagsData,

    noteAttributesData,
    noteAttributesDataError,
    noteChangeLogsDataError,
    tagsDataError,
    noteOnTagsDataError,

    createNote,
    updateNote,
    deleteNote,
  };
}
export default useNotes;
