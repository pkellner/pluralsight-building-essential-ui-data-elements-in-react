function NoteCard({ note }) {
  return (
    <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick"></span>
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
        <p className="note-inner-content text-muted">
          {note.description}
        </p>
      </div>
    </div>
  );
}

export default NoteCard;