import { useContext, useState } from "react";
import { NotesContext } from "./App";

function NoteChangeLogs() {
  const { notesData, noteChangeLogsData } = useContext(NotesContext);

  const [selectedNoteId, setSelectedNoteId] = useState(-1);
  const noteChangeLogsSelected = noteChangeLogsData.filter(
    (ncl) => ncl.noteId === selectedNoteId
  );

  function dateOut(dateValue) {
    return new Date(dateValue).toLocaleTimeString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <style jsx>{`
        .blue-border-rounded {
          border: 3px solid lightgray;
          border-radius: 5px;
        }
        .selected-row {
          background-color: darkgray;
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col-6 ">
            {
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Note Id</th>
                  </tr>
                </thead>
                <tbody>
                  {[...notesData]
                    .sort((a, b) => {
                      const dateA = a.createDate;
                      const dateB = b.createDate;
                      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
                    })
                    .map(function (note) {
                      return (
                        <tr
                          key={note.id}
                          className={
                            note.id === selectedNoteId ? "selected-row" : ""
                          }
                          onClick={(event) => {
                            setSelectedNoteId(note.id);
                          }}
                        >
                          <td>{note.title}</td>
                          <td>{dateOut(note.createDate)}</td>
                          <td>{note.id.slice(0, 6) + "..."}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            }
          </div>
          <div className="col-6  blue-border-rounded">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Change Date</th>
                  <th scope="col">Operation</th>
                  <th scope="col">Log Id</th>
                </tr>
              </thead>
              <tbody>
                {selectedNoteId != -1
                  ? noteChangeLogsSelected
                      .sort((a, b) => {
                        const dateA = a.changeDate;
                        const dateB = b.changeDate;
                        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
                      })
                      .map(function (changeLogRec) {
                        return (
                          <tr key={changeLogRec.id}>
                            <td>{dateOut(changeLogRec.changeDate)}</td>
                            <td>{changeLogRec.operation}</td>
                            <td>{changeLogRec.id.slice(0, 6) + "..."}</td>
                          </tr>
                        );
                      })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteChangeLogs;
