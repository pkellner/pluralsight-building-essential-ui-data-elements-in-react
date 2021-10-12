import { NotesModalContext } from "./App";
import { useContext } from "react";

function Menu() {
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

  return (
    <ul className="nav nav-pills p-3 bg-white mb-3 founded-pill align-items-center">
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
    </ul>
  );
}

export default Menu;
