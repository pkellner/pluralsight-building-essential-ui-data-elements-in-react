import NotesModalHeader from "./NotesModalHeader";
import NotesModalBody from "./NotesModalBody";
import NotesModalFooter from "./NotesModalFooter";

function NotesModal() {
  return (
    <div role="dialog" aria-hidden="false">
      <div className="modal-dialog modal-dialog-centered" role="document" >
        <NotesModalHeader />
        <NotesModalBody />
        <NotesModalFooter />
      </div>
    </div>
  );
}

export default NotesModal;