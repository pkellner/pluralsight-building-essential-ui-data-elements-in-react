import {useContext, useState} from "react";
import {NotesContext, NotesModalContext} from "./App";

function NoteModal() {
  const { notesData, tagsData, createNote, updateNote } =
    useContext(NotesContext);

  const notesModalState = useContext(NotesModalContext);

  const [tagNamesNewValue, setTagNamesNewValue] = useState("");

  if (!(notesData && tagsData)) return null;

  let cssShowHide =
    notesModalState.modalShow.value === true
      ? "modal show-modal"
      : "modal hide-modal";

  function NoteModalBody() {
    return (
      <div className="modal-body">
        <div className="notes-box">
          <div className="notes-content">
            <form action="" id="addnotesmodalTitle">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="note-title">
                    <label>Note Title</label>
                    <input
                      value={notesModalState.modalNoteTitle.value}
                      onChange={(event) => {
                        notesModalState.modalNoteTitle.set(event.target.value);
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
                      value={notesModalState.modalNoteDescription.value ?? ""}
                      onChange={(event) => {
                        notesModalState.modalNoteDescription.set(
                          event.target.value
                        );
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

        <hr />
        <div className="notes-box  margin-left-right-15">
          <div className="container">
            <h6>Tags</h6>
            <div className="row">
              {[...tagsData]
                .sort(function (a, b) {
                  const textA = a.tagName.toUpperCase();
                  const textB = b.tagName.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((rec) => {
                  return (
                    <div className="col-2" key={rec.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`formchecklabelid-${rec.id}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            notesModalState.modalNoteTagIds.set([
                              ...notesModalState.modalNoteTagIds.value,
                              rec.id,
                            ]);
                          } else {
                            notesModalState.modalNoteTagIds.set(
                              notesModalState.modalNoteTagIds.value.filter(
                                (r) => r != rec.id
                              )
                            );
                          }
                        }}
                        checked={
                          notesModalState.modalNoteTagIds.value.includes(rec.id)
                            ? true
                            : false
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`formchecklabelid-${rec.id}`}
                      >
                        {rec.tagName}
                      </label>
                    </div>
                  );
                })}
            </div>
            <div className="row">
              <input
                value={tagNamesNewValue}
                onChange={(event) => {
                  setTagNamesNewValue(event.target.value);
                }}
                type="text"
                className="form-control font-size-smaller margin-top-10"
                placeholder="New Tags (csv)"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                {notesModalState.modalNoteId.value === 0 ? (
                  <span>Add Note</span>
                ) : (
                  <span>Edit Note</span>
                )}
              </h5>
              <button
                type="button"
                onClick={() => {
                  notesModalState.modalShow.set(false);
                }}
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {NoteModalBody()}
            <div className="modal-footer">
              {notesModalState.modalNoteId.value === 0 ? (
                <></>
              ) : (
                <button
                  onClick={() => {
                    const tagNamesNewValueArray = tagNamesNewValue
                      .split(",")
                      .filter((a) => a && a.length > 0);

                    updateNote(
                      notesModalState.modalNoteId.value,
                      notesModalState.modalNoteTitle.value,
                      notesModalState.modalNoteDescription.value,
                      undefined,
                      undefined,
                      notesModalState.modalNoteTagIds.value,
                      tagNamesNewValueArray
                    );
                    notesModalState.modalShow.set(false);
                    setTagNamesNewValue("");
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
                  notesModalState.modalShow.set(false);
                }}
                data-dismiss="modal"
              >
                Discard
              </button>
              {notesModalState.modalNoteId.value === 0 ? (
                <button
                  id="btn-n-add"
                  className="btn btn-info"
                  onClick={() => {
                    const tagNamesNewValueArray = tagNamesNewValue.split(",");
                    createNote(
                      notesModalState.modalNoteTitle.value,
                      notesModalState.modalNoteDescription.value,
                      notesModalState.modalNoteTagIds.value,
                      tagNamesNewValueArray
                    );
                    notesModalState.modalShow.set(false);
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

export default NoteModal;
