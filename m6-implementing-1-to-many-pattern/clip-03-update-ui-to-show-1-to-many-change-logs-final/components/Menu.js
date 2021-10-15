import { NotesModalContext } from "./App";
import { useContext } from "react";

function AddNoteButton() {
  return null;
}

function Menu({ currentTab, setCurrentTab }) {
  const {
    setModalNoteId,
    setModalNoteTitle,
    setModalNoteDescription,
    setModalShow,
  } = useContext(NotesModalContext);

  function createNoteFn() {
    setModalNoteId(0);
    setModalNoteTitle("");
    setModalNoteDescription("");
    setModalShow(true);
  }

  function AddNoteButton() {
    return (
      <li className="nav-item ml-auto">
        <a
          href="#"
          onClick={createNoteFn}
          className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
        >
          <i className="icon-note m-1"></i>
          <span className="d-none d-md-block font-14">Add Notes</span>
        </a>
      </li>
    );
  }

  function AllNotesTabItem() {
    return (
      <li className="nav-item">
        <a
          href="#"
          onClick={() => {
            setCurrentTab("notes");
          }}
          className={
            currentTab === "notes"
              ? "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
              : "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2"
          }
          id="all-category"
        >
          <i className="icon-layers mr-1"></i>
          <span className="d-none d-md-block">All Notes</span>
        </a>
      </li>
    );
  }

  function ChangeLogsTabItem() {
    return (
      <li className="nav-item">
        <a
          href="#"
          onClick={() => {
            setCurrentTab("logs");
          }}
          className={
            currentTab === "logs"
              ? "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
              : "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2"
          }
          id="all-category"
        >
          <i className="icon-layers mr-1"></i>
          <span className="d-none d-md-block">Change Logs</span>
        </a>
      </li>
    );
  }

  return (
    <ul className="nav nav-pills p-3 bg-white mb-3 founded-pill align-items-center">
      <AllNotesTabItem />
      <ChangeLogsTabItem />
      {currentTab === "notes" && <AddNoteButton />}
    </ul>
  );
}

export default Menu;
