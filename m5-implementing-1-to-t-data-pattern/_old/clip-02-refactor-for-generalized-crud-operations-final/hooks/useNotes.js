import { useEffect, useState } from "react";
import notes from "../data/notes.json";
import { v4 as uuidv4 } from "uuid";
import { useGeneralizedCrudMethods } from "./useGeneralizedCrudMethods";

export const DELAYMS = 1000;

function useNotes() {
  const {
    data: notesData,
    error: notesDataError,
    createRecord: createNotesData,
    updateRecord: updateNotesData,
    deleteRecord: deleteNotesData,
  } = useGeneralizedCrudMethods(notes);

  function createNote(title, description) {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createNotesData(newNote);
  }

  function updateNote(
    id,
    title,
    description
  ) {
    if (title || description) {
      const updateObject = {
        title,
        description,
      };
      updateNotesData(id, updateObject);
    }
  }

  function deleteNote(id) {
    deleteNotesData(id);
  }

  return {
    notesData,
    notesDataError,
    createNote,
    updateNote,
    deleteNote,
  };
}

export default useNotes;
