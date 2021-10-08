import {useContext} from "react";
import {NotesModalContext} from "../App";

function NotesModalBody() {
    const { modalNoteDescription,setModalNoteDescription, modalNoteTitle, setModalNoteTitle} = useContext(NotesModalContext);
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
    );
}

export default NotesModalBody;


