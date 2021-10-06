import NoteList from './NoteList.js';
import useNotes from '../hooks/useNotes';
import Menu from './Menu';
import { createContext } from "react";

export const NotesContext = createContext({
  notesData: [],
  notesDataError: "",
  createNote: () => { },
  updateNote: () => { },
  deleteNote: () => { },
});

function App() {

  const contextValue = useNotes();

  if (contextValue.notesDataError) {
    return <div className="container">error: {contextValue.notesDataError}</div>;
  }
  if (!contextValue.notesData) {
    return <div className="container">...loading</div>;
  }

  return (
    <div className="container">
      <NotesContext.Provider value={contextValue}>
        <Menu />
        <NoteList />
      </NotesContext.Provider>
    </div>
  );
}

export default App;