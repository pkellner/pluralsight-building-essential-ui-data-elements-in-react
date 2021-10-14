function NotesModalBody() {
  return (
    <div className="modal-body">
      <div className="notes-box">
        <div className="notes-content">
          <form>
            <div className="row">
              <div className="col-md-12">
                <div className="note-title">
                  <label>Note Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <label>Note Description</label>
                <textarea
                  className="form-control"
                  placeholder="Description"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default NotesModalBody;
