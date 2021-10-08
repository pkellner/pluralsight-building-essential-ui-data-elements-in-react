import { useContext } from "react";
import { NotesContext, NotesModalContext } from "../App";

function NotesModal() {
  const {
    modalShow,
    setModalShow,
    modalNoteId,
    setModalNoteId,
    modalNoteTitle,
    setModalNoteTitle,
    modalNoteDescription,
    setModalNoteDescription,
  } = useContext(NotesModalContext);

  const { updateNote, createNote } = useContext(NotesContext);

  let cssShowHide =
    modalShow && modalShow === true ? "modal show-modal" : "modal hide-modal";

  return (
    <>
      <style jsx>{`
        .show-modal {
          display: block;
        }
        .hide-modal {
          display: none;
        }
      `}</style>
      <div
        className={cssShowHide}
        id="addnotesmodal"
        // tabIndex="-1"
        role="dialog"
        aria-labelledby="addnotesmodalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title text-white">
                {modalNoteId === 0 ? (
                  <span>Add Note</span>
                ) : (
                  <span>Edit Note</span>
                )}
              </h5>
              <button
                type="button"
                onClick={() => {
                  setModalShow(false);
                }}
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="notes-box">
                <div className="notes-content">
                  <form action="" id="addnotesmodalTitle">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <div className="note-title">
                          <label>Note Title</label>
                          <input
                            value={modalNoteTitle}
                            onChange={(event) => {
                              setModalNoteTitle(event.target.value);
                            }}
                            type="text"
                            id="note-has-title"
                            className="form-control"
                            placeholder="Title"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="note-description">
                          <label>Note Description</label>
                          <textarea
                            value={modalNoteDescription ?? ""}
                            onChange={(event) => {
                              setModalNoteDescription(event.target.value);
                            }}
                            id="note-has-description"
                            className="form-control"
                            minLength={60}
                            placeholder="Description"
                            rows={3}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesModal;
