import { NotesContext, NotesModalContext } from "./App";
import { useContext } from "react";

function NoteCard({ note }) {
  const {
    notesData,
    noteAttributesData,
    tagsData,
    noteOnTagsData,
    updateNote,
    deleteNote,
  } = useContext(NotesContext);
  const {
    setModalNoteId,
    setModalShow,
    setModalNoteTitle,
    setModalNoteDescription,
    setModalNoteTagIds,
    setTagNamesNewValue,
  } = useContext(NotesModalContext);

  function editNoteFn(noteId) {
    setModalNoteId(noteId);
    setModalNoteTitle(notesData.find((rec) => rec.id === noteId).title);
    setModalNoteDescription(
      notesData.find((rec) => rec.id === noteId).description
    );
    setTagNamesNewValue("");
    setModalNoteTagIds(
      noteOnTagsData
        .filter(function (rec) {
          return rec.noteId === noteId;
        })
        .map((rec) => rec.tagId)
    );
    setModalShow(true);
  }

  function deleteNoteFn(noteId) {
    deleteNote(noteId);
  }

  const noteAttributes = noteAttributesData
    ? noteAttributesData.find((rec) => rec.noteId === note.id)
    : { notePinned: 0, noteImportant: 0 };

  const notePinned = noteAttributes?.pinned === 1 ? true : false;
  const noteImportant = noteAttributes?.important === 1 ? true : false;

  const tagsDataDictionary = tagsData
    ? Object.fromEntries(tagsData.map(({ id, tagName }) => [id, tagName]))
    : {};
  const noteTags = noteOnTagsData
    ? noteOnTagsData
        .filter((r) => r.noteId === note.id) // just for this particular note
        .map((r) => {
          return {
            ...r,
            tagName: tagsDataDictionary[r.tagId],
          }; // adds tagName to noteTags list
        })
    : [];

  function NoteTagsSection() {
    return (
      <div className="row margin-left-right-15">
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
                        .filter((rec) => {
                          return rec.tagId != noteTag.tagId;
                        })
                        .map((nt) => nt.tagId);
                      updateNote(
                        note.id,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        tagIdsForNote,
                        undefined
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
    );
  }

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
                noteImportant
              );
            }}
          >
            <i
              className={
                notePinned
                  ? "float-right fas fa-thumbtack fa-lg text-info"
                  : "float-right fas fa-thumbtack fa-rotate-90"
              }
            ></i>
          </a>
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
            <a
              className="margin-left-right-15"
              href="#"
              onClick={() => {
                updateNote(
                  note.id,
                  undefined,
                  undefined,
                  notePinned,
                  !noteImportant
                );
              }}
            >
              <i
                className={
                  noteImportant === true
                    ? "fa fa-star fa-lg text-danger"
                    : "fa fa-star fa-hollow-black fa-lg"
                }
              ></i>
            </a>
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
        <div className="margin-top-10">
          <NoteTagsSection />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
