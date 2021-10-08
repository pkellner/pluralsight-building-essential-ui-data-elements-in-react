import { createContext } from "react";

import NoteList from "./NoteList.js";
import Menu from "./Menu";
import useNotes from "../hooks/useNotes";
import useNotesModal from "../hooks/useNotesModal";

export const NotesContext = createContext({
  notesData: [],
  notesDataError: "",
  createNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
});

export const NotesModalContext = createContext({
  modalShow: false,
  setModalShow: () => {},
  modalNoteId: 0,
  setModalNoteId: () => {},
  modalTitle: "",
  setModalTitle: () => {},
  modalDescription: "",
  setModalDescription: () => {},
});

function App() {
  const notesContextValue = useNotes();
  const notesModalContextValue = useNotesModal();

  if (notesContextValue.notesDataError) {
    return (
      <div className="container">error: {notesContextValue.notesDataError}</div>
    );
  }
  if (!notesContextValue.notesData) {
    return <div className="container">...loading</div>;
  }

  return (
    <div className="container">
      <NotesContext.Provider value={notesContextValue}>
        <NotesModalContext.Provider value={notesModalContextValue}>
          <Menu />
          <NoteList />
        </NotesModalContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}

export default App;
