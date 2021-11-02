import NoteList from "./NoteList.js";
import useNotes from "../hooks/useNotes";
import useNotesModal from "../hooks/useNotesModal";
import Menu from "./Menu";
import { createContext, useState } from "react";
import NoteChangeLogs from "./NoteChangeLogs";

export const NotesContext = createContext({
  notesData: [],
  notesDataError: "",
  createNote: () => {},
  updateNote: () => {},
  deleteNote: () => { },
});

export const NotesModalContext = createContext({
  modalShow: false,
  setModalShow: () => {},
  modalNoteId: 0,
  setModalNoteId: () => {},
  modalTitle: "",
  setModalTitle: () => {},
  modalDescription: "",
  setModalDescription: () => { },
  modalNoteTagIds: [], setModalNoteTagIds: () => { },
  tagNamesNewValue: "", setTagNamesNewValue: () => { },
});

function App() {
  const contextValue = useNotes();
  const contextValueNotesModal = useNotesModal();
  const [currentTab, setCurrentTab] = useState("notes"); // ("notes" or "logs")

  if (contextValue.notesDataError) {
    return (
      <div className="container">
        error: {contextValue.notesDataError}
      </div>
    );
  }
  if (!contextValue.notesData) {
    return <div className="container">...loading</div>;
  }

  return (
    <div className="container">
      <NotesContext.Provider value={contextValue}>
        <NotesModalContext.Provider
          value={contextValueNotesModal}
        >
          <Menu
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          {currentTab === "notes" && <NoteList />}
          {currentTab === "logs" && <NoteChangeLogs />}
        </NotesModalContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}

export default App;
