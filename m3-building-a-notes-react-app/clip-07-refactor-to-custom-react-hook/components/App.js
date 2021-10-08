import NoteList from "./NoteList.js";
import useNotes from "../hooks/useNotes";

function App() {
  const { notesData, notesDataError } = useNotes();

  if (notesDataError) {
    return <div className="container">error: {notesDataError}</div>;
  }
  if (!notesData) {
    return <div className="container">...loading</div>;
  }

  return (
    <div className="container">
      <NoteList notesData={notesData} />
    </div>
  );
}

export default App;
