import NoteList from "./NoteList";
import Menu from "./Menu";
import useNotes from "./useNotes";

import { createContext, useState } from "react";
import NoteChangeLogs from "./NoteChangeLogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useNotesModal from "./useNotesModal";

export const NotesContext = createContext({
  notesData: [],
  notesDataError: "",
  createNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
});

export const NotesModalContext = createContext();

function App() {
  const [currentTab, setCurrentTab] = useState("notes"); // ("notes" or "logs")

  const notesContextValue = useNotes(errorNotificationFn);
  const notesModalState = useNotesModal();

  function errorNotificationFn(errorMessage) {
    toast.error(errorMessage);
  }

  if (notesContextValue.notesDataError) {
    return <div>error: {notesContextValue.notesDataError}</div>;
  }

  if (!notesContextValue.notesData) {
    return <div className="page-content container">...loading</div>;
  }

  return (
    <div className="page-content container note-has-grid">
      <NotesContext.Provider value={notesContextValue}>
        <NotesModalContext.Provider value={notesModalState}>
          <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab === "notes" && <NoteList />}
          {currentTab === "logs" && <NoteChangeLogs />}
        </NotesModalContext.Provider>
      </NotesContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
