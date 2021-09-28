import NoteCard from "./NoteCard.js";

function NoteList({ notesData, updateNote, deleteNote }) {

  function sortByDate(a, b) {
    const dateA = a.createDate;
    const dateB = b.createDate;
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  }
  
  return (
    <div className="row tab-content bg-transparent note-has-grid">
      {notesData.sort(sortByDate).map((note) => {
        return <NoteCard note={note} key={note.id}
          updateNote={updateNote} deleteNote={deleteNote} />;
      })}
    </div>
  );
}

export default NoteList;