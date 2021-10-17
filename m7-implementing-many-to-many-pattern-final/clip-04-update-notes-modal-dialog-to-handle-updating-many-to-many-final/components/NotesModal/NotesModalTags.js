import { NotesContext, NotesModalContext } from "../App";
import { useContext, useState } from "react";

function NotesModalTags() {
  const {
    modalNoteTagIds,
    setModalNoteTagIds,
    tagNamesNewValue,
    setTagNamesNewValue,
  } = useContext(NotesModalContext);
  const { tagsData } = useContext(NotesContext);
  //if (!tagsData) return null;

  return (
    <>
      <div>{JSON.stringify(modalNoteTagIds)}</div>
      <div className="notes-box  margin-left-right-15">
        <div className="container">
          <h6>Tags</h6>
          <div className="row">
            {tagsData
              ? [...tagsData]
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
                              setModalNoteTagIds([...modalNoteTagIds, rec.id]);
                            } else {
                              setModalNoteTagIds(
                                modalNoteTagIds.filter((r) => r != rec.id)
                              );
                            }
                          }}
                          checked={
                            modalNoteTagIds.includes(rec.id) ? true : false
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
                  })
              : null}
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
      {/*<hr />*/}
      {/*<div className="modal-body">*/}
      {/*  modalNoteTagIds: {JSON.stringify(modalNoteTagIds)}*/}
      {/*</div>*/}
    </>
  );
}
export default NotesModalTags;
