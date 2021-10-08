

function NotesModalHeader() {
  return (
    <div className="modal-header big-info text-white">
      <h5 className="modal-title text-white">
        <span>Add or Edit Note</span>
      </h5>
      <button
        type="button"
        onClick={() => { }}
        className="close text-white"
        data-dismiss="modal"
        aria-label="close">
          <span aria-hidden="true">x</span>
      </button>
    </div>
  );
}

export default NotesModalHeader;