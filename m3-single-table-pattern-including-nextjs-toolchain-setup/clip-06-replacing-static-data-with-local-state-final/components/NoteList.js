import NoteCard from "./NoteCard.js";
import notes from "../data/notes.json";
import { useEffect, useState } from 'react';

function NoteList() {

  const [notesData, setNotesData] = useState();
  const [notesDataError, setNotesDataError] = useState();

  useEffect(() => {
    async function getData() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        //throw "crash"
        setNotesData(notes);
      } catch (e) {
        setNotesDataError(e);
      }
    }
    getData().then(() => {});
  }, []);

  // NEED TO MENTION ERROR BOUNDARIES, BUT NOT used now
  if (notesDataError) {
    return <div>error: {notesDataError}</div>;
  }

  if (!notesData) {
    return <div>...loading</div>;
  }

  // SORT REVERSE DATE ORDER
  function sortByDate(a, b) {
    const dateA = a.createDate;
    const dateB = b.createDate;
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  }

  return (
    <div className="row tab-content bg-transparent note-has-grid">
      {notesData.sort(sortByDate).map((note) => {
        return <NoteCard note={note} key={note.id} />;
      })}
    </div>
  );
}

export default NoteList;