import NoteList from "./NoteList.js";
import useNotes from "../hooks/useNotes";
import Menu from "./Menu";

function App() {
  const { notesData, notesDataError, createNote, updateNote, deleteNote } =
    useNotes();

  if (notesDataError) {
    return <div className="container">error: {notesDataError}</div>;
  }
  if (!notesData) {
    return <div className="container">...loading</div>;
  }
  function createNoteFn() {
    const timeOfDay = new Date().toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    createNote(
      `Note at ${timeOfDay}`,
      `This sample note created at ${timeOfDay}`
    );
  }

  return (
    <div className="container">
      <Menu createNoteFn={createNoteFn} />
      <NoteList
        notesData={notesData}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
}

export default App;
