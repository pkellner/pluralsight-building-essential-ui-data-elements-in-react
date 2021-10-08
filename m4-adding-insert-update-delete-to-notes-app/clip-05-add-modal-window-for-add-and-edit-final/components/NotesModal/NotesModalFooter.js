import { NotesContext, NotesModalContext } from "../App";
import { useContext } from "react";

function NotesModalFooter() {
  const { setModalShow, modalNoteId, modalNoteTitle, modalNoteDescription } =
    useContext(NotesModalContext);
  const { updateNote, createNote } = useContext(NotesContext);

  return (
    <div className="modal-footer">
      {modalNoteId === 0 ? (
        <></>
      ) : (
        <button
          onClick={() => {
            updateNote(
              modalNoteId,
              modalNoteTitle,
              modalNoteDescription,
              undefined,
              undefined
            );

            setModalShow(false);
          }}
          id="btn-n-save"
          className="float-left btn btn-success"
        >
          Save
        </button>
      )}

      <button
        className="btn btn-danger"
        onClick={() => {
          setModalShow(false);
        }}
        data-dismiss="modal"
      >
        Discard
      </button>
      {modalNoteId === 0 ? (
        <button
          id="btn-n-add"
          className="btn btn-info"
          onClick={() => {
            createNote(modalNoteTitle, modalNoteDescription);
            setModalShow(false);
          }}
        >
          Add
        </button>
      ) : null}
    </div>
  );
}

export default NotesModalFooter;
