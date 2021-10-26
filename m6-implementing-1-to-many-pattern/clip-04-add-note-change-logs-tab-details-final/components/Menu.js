import { NotesModalContext } from "./App";
import { useContext } from "react";

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

  function TabItem({ tabValue, tabText }) {
    const tabClass =
      tabValue === currentTab
        ? "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
        : "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2";

    return (
      <li className="nav-item">
        <a
          href="#"
          onClick={() => {
            setCurrentTab(tabValue);
          }}
          className={tabClass}
          id="all-category"
        >
          <i className="icon-layers mr-1"></i>
          <span className="d-none d-md-block">
            {tabText}
          </span>
        </a>
      </li>
    );
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
          <span className="d-none d-md-block font-14">
            Add Notes
          </span>
        </a>
      </li>
    );
  }

  return (
    <ul className="nav nav-pills p-3 bg-white mb-3 founded-pill align-items-center">
      <TabItem tabValue="notes" tabText="All Notes" />
      <TabItem tabValue="logs" tabText="Change Logs" />
      {currentTab === "notes" && <AddNoteButton />}
    </ul>
  );
}

export default Menu;
