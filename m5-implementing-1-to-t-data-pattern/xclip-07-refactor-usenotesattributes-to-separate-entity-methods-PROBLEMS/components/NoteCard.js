import { NotesContext, NotesModalContext } from "./App";
import { useContext } from "react";

function NoteCard({ note }) {
  const { notesData, deleteNote } = useContext(NotesContext);
  const {
    setModalNoteId,
    setModalShow,
    setModalNoteTitle,
    setModalNoteDescription,
  } = useContext(NotesModalContext);

  function editNoteFn(noteId) {
    setModalNoteId(noteId);
    setModalNoteTitle(notesData.find((rec) => rec.id === noteId).title);
    setModalNoteDescription(
      notesData.find((rec) => rec.id === noteId).description
    );
    setModalShow(true);
  }

  function deleteNoteFn(noteId) {
    deleteNote(noteId);
  }

  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <div>
          <span className="side-stick"></span>
          <h5 className="note-title text-truncate w-75 mb-0">{note.title}</h5>
        </div>

        <p className="note-date font-12 text-muted">
          {new Date(note.createDate).toLocaleTimeString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <div className="note-content">
          <p className="note-inner-content text-muted">{note.description}</p>
        </div>

        <div className="d-flex align-items-center">
          <span className="mr-2">
            <a href="#" onClick={() => deleteNoteFn(note.id)}>
              <i className="fa fa-trash fa-lg"></i>
            </a>
          </span>
          <span className="mr-2">
            <a href="#" onClick={() => editNoteFn(note.id)}>
              <i className="fa fa-edit fa-lg"></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
