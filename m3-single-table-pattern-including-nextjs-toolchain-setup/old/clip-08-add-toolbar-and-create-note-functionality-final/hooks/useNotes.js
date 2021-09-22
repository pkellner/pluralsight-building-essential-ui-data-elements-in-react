import { useEffect, useState } from 'react';
import notes from '../data/notes.json';
import { v4 as uuidv4 } from 'uuid';

function useNotes() {
  const [notesData, setNotesData] = useState();
  const [notesDataError, setNotesDataError] = useState();

  useEffect(() => {
    async function getData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        //throw 'crash';
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
      return [...oldNotes, newNote]; // ORDER NOT IMPORTANT FOR NEW REC AS THEY GET SORTED IN NOTESLIST REGARDLESS
    });
  }

  return {
    notesData,
    notesDataError,
    createNote,
  };
}
export default useNotes;
