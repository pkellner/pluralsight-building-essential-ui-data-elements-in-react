import { NotesContext } from "./App";
import { useContext } from "react";
import { NotesModalContext } from "./App";

function NoteCard({ note }) {
  const {
    notesData,
    noteAttributesData,
    tagsData,
    noteOnTagsData,
    deleteNote,
    updateNote,
  } = useContext(NotesContext);

  const notesModalState = useContext(NotesModalContext);

  function editNoteFn(noteId) {
    notesModalState.modalNoteId.set(noteId);
    notesModalState.modalNoteTitle.set(getTitle(noteId));
    notesModalState.modalNoteDescription.set(getDescription(noteId));
    notesModalState.modalNoteTagIds.set(getAssignedTagIds(noteId));
    notesModalState.modalShow.set(true);
  }

  function deleteNoteFn(id) {
    notesModalState.modalNoteId.set(0);
    notesModalState.modalNoteTitle.set("");
    notesModalState.modalShow.set(false);
    deleteNote(id);
  }

  function getTitle(noteId) {
    return notesData.find((rec) => rec.id === noteId).title;
  }

  function getDescription(noteId) {
    return notesData.find((rec) => rec.id === noteId).description;
  }

  function getAssignedTagIds(noteId) {
    return noteOnTagsData
      ? noteOnTagsData
          .filter((r) => r.noteId === noteId)
          .map((r) => {
            return r.tagId;
          })
      : [];
  }

  // if no noteAttribute record found, then this means pinned and important are false;
  const noteAttributes = noteAttributesData.find(
    (rec) => rec.noteId === note.id
  );

  const notePinned = noteAttributes?.pinned === 1 ? true : false;
  const noteImportant = noteAttributes?.important === 1 ? true : false;

  const tagsDataDictionary = tagsData
    ? Object.fromEntries(tagsData.map(({ id, tagName }) => [id, tagName]))
    : {};

  const noteTags = noteOnTagsData
    ? noteOnTagsData
        .filter((r) => r.noteId === note.id)
        .map((r) => {
          return { ...r, tagName: tagsDataDictionary[r.tagId] };
        })
    : [];

  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <div>
          <a
            href="#"
            onClick={() => {
              updateNote(
                note.id,
                undefined,
                undefined,
                !notePinned,
                noteImportant,
                undefined,
                undefined
              );
            }}
          >
            <i
              className={
                notePinned
                  ? "float-right fa fa-thumb-tack fa-lg is-pinned"
                  : "float-right fa fa-thumb-tack fa-rotate-270"
              }
            ></i>
          </a>
          <div>
            <span className="side-stick"></span>
            <h5 className="note-title text-truncate w-75 mb-0">{note.title}</h5>
          </div>
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

        <div className="d-flex align-items-center ">
          <span className="mr-2">
            <a
              href="#"
              onClick={() => {
                updateNote(
                  note.id,
                  undefined,
                  undefined,
                  notePinned,
                  !noteImportant,
                  undefined,
                  undefined
                );
              }}
            >
              <i
                className={
                  noteImportant === true
                    ? "fa fa-star is-important fa-lg"
                    : "fa fa-star fa-lg"
                }
              ></i>
            </a>
          </span>

          <span className="mr-2">
            <a href="#" onClick={() => deleteNoteFn(note.id)}>
              <i className="fa fa-trash-o fa-lg"></i>
            </a>
          </span>
          <span className="mr-2">
            <a href="#" onClick={() => editNoteFn(note.id)}>
              <i className="fa fa-pencil-square-o fa-lg "></i>
            </a>
          </span>
          <span className="mr-2"></span>
          <span className="mr-2"></span>
          <span className="mr-2 container">
            <div className="row">
              {noteTags
                .sort(function (a, b) {
                  const textA = a?.tagName?.toUpperCase();
                  const textB = b?.tagName?.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((noteTag) => {
                  return (
                    <div key={noteTag.id}>
                      <span className="textbox-tag">
                        {noteTag.tagName}&nbsp;
                        <a
                          href="#"
                          onClick={() => {
                            const tagIdsForNote = noteTags
                              .filter((nt) => {
                                return nt.tagId != noteTag.tagId;
                              })
                              .map((nt) => nt.tagId);
                            updateNote(
                              note.id,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              tagIdsForNote,
                              []
                            );
                          }}
                        >
                          {" "}
                          <i className="icon fa fa-times-circle"></i>{" "}
                        </a>
                      </span>
                    </div>
                  );
                })}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
