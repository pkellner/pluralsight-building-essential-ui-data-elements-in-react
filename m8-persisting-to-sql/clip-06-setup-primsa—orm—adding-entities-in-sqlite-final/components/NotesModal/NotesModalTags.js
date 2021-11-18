import { NotesContext, NotesModalContext } from "../App";
import { useContext } from "react";

function NotesModalTags() {
  const {
    modalNoteTagIds,
    setModalNoteTagIds,
    tagNamesNewValue,
    setTagNamesNewValue,
  } = useContext(NotesModalContext);
  const { tagsData } = useContext(NotesContext);
  if (!modalNoteTagIds || !tagsData) return null;

  return (
    <div className="modal-body">
      <div className="notes-box">
        <div className="notes-content">
          <div className="d-flex align-items-center">
            <div className="mr-2 container">
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
                          <div
                            className="col-2 margin-left-right-15"
                            key={rec.id}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`formchecklabelid-${rec.id}`}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setModalNoteTagIds([
                                    ...modalNoteTagIds,
                                    rec.id,
                                  ]);
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
            </div>
            <div className="mr-2 container">
              <div className="row">
                <input
                  value={tagNamesNewValue}
                  type="text"
                  placeholder="New Tags (CSV)"
                  className="form-control font-size-smaller margin-top-10"
                  onChange={(event) => {
                    setTagNamesNewValue(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesModalTags;
