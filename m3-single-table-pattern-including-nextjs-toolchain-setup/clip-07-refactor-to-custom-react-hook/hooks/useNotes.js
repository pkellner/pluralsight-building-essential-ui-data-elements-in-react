import { useEffect, useState } from 'react';
import notes from '../data/notes.json';


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
  });

  return { notesData, notesDataError };

}

export default useNotes;