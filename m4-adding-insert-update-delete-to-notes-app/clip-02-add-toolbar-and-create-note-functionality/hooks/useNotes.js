import { useEffect, useState } from "react";
import notes from "../data/notes.json";
import { v4 as uuidv4 } from "uuid";

function useNotes() {
  const [notesData, setNotesData] = useState();
  const [notesDataError, setNotesDataError] = useState();

  useEffect(() => {
    async function getData() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        setNotesData(notes);
      } catch (e) {
        setNotesDataError(e);
      }
    }
    getData();
  }, []);

  function createNote(title, description) {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      createDate: new Date().toISOString(),
    };
    setNotesData((oldNotes) => {
      return [...oldNotes, newNote]; // Order does not matter as sort happens later
    });
  }

  return { notesData, notesDataError, createNote };
}

export default useNotes;
