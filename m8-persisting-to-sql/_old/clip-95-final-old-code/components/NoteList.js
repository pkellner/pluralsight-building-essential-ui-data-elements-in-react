import NoteCard from "./NoteCard";
import { useContext, createContext } from "react";
import NoteModal from "./NoteModal";
import { NotesContext } from "./App";

function NoteList() {
  const { notesData, noteAttributesData } = useContext(NotesContext);

  // SORT REVERSE DATE ORDER
  function sortByDate(a, b) {
    const dateA = a.createDate;
    const dateB = b.createDate;
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  }

  // because we have no "isLoading flag with useSWR, need to verify we have data before rendering
  if (!(notesData && noteAttributesData)) return null;

  const notesPinned = noteAttributesData
    .filter((na) => na.pinned === 1)
    .map((na) => na.noteId);

  return (
    <>
      <NoteModal />
      <>
        <div className="tab-content bg-transparent">
          <div id="note-full-container" className="note-has-grid row">
            {notesData
              .filter((n) => notesPinned.includes(n.id))
              .sort(sortByDate)
              .map((note) => {
                return <NoteCard note={note} key={note.id} />;
              })}
          </div>
        </div>
        {notesPinned.length > 0 ? <hr /> : null}
        <div className="tab-content bg-transparent">
          <div id="note-full-container" className="note-has-grid row">
            {notesData
              .filter((n) => !notesPinned.includes(n.id))
              .sort(sortByDate)
              .map((note) => {
                return <NoteCard note={note} key={note.id} />;
              })}
          </div>
        </div>
      </>
    </>
  );
}

export default NoteList;
