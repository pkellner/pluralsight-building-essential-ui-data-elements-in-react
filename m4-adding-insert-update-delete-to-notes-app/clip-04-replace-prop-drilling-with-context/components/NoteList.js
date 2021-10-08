import NoteCard from "./NoteCard.js";
import { NotesContext } from "./App";
import { useContext } from "react";

function NoteList() {
  const { notesData } = useContext(NotesContext);

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
