import NoteCard from "./NoteCard.js";
import { NotesContext } from "./App";
import { useContext } from "react";
import NotesModal from "./NotesModal/NotesModal";

function NoteList() {
  const {
    notesData,
    noteAttributesData,
    noteChangeLogsData,
  } = useContext(NotesContext);

  function sortByDate(a, b) {
    const dateA = a.createDate;
    const dateB = b.createDate;
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  }

  if (
    !(notesData && noteAttributesData && noteChangeLogsData)
  )
    return null;

  const notesPinned = noteAttributesData
    .filter((na) => na.pinned === 1)
    .map((na) => na.noteId);

  return (
    <>
      {notesData && <NotesModal />}
      <div className="row tab-content bg-transparent note-has-grid">
        {notesData
          .filter((n) => notesPinned.includes(n.id))
          .sort(sortByDate)
          .map((note) => {
            return <NoteCard note={note} key={note.id} />;
          })}
      </div>
      {notesPinned.length > 0 ? <hr /> : null}
      <div className="row tab-content bg-transparent note-has-grid">
        {notesData
          .filter((n) => !notesPinned.includes(n.id))
          .sort(sortByDate)
          .map((note) => {
            return <NoteCard note={note} key={note.id} />;
          })}
      </div>
    </>
  );
}

export default NoteList;
