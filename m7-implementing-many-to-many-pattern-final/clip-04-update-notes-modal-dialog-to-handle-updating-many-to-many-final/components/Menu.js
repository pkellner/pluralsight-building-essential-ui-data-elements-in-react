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
    setModalNoteTagIds,
    setTagNamesNewValue,
  } = useContext(NotesModalContext);

  function createNoteFn() {
    setModalNoteId(0);
    setModalNoteTitle("");
    setModalNoteDescription("");
    setModalNoteTagIds([]);
    setTagNamesNewValue("");

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

  function TabItem({ tabValue, tabText }) {
    return (
      <li className="nav-item">
        <a
          href="#"
          onClick={() => {
            setCurrentTab(tabValue);
          }}
          className={
            tabValue === currentTab
              ? "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
              : "nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2"
          }
          id="all-category"
        >
          <i className="icon-layers mr-1"></i>
          <span className="d-none d-md-block">{tabText}</span>
        </a>
      </li>
    );
  }

  return (
    <ul className="nav nav-pills p-3 bg-white mb-3 founded-pill align-items-center">
      <TabItem tabValue="notes" tabText="All Notes" />
      <TabItem tabValue="logs" tabText="Change Logs" />
      {/*  <hr/>*/}
      {/*<AllNotesTabItem />*/}
      {/*<ChangeLogsTabItem />*/}
      {currentTab === "notes" && <AddNoteButton />}
    </ul>
  );
}

export default Menu;
