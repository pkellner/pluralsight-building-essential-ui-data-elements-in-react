import {useState} from "react";

function useNotesModal() {
  const [modalShow, setModalShow] = useState(false);
  const [modalNoteId, setModalNoteId] = useState(0); // if 0, means create note in modal
  const [modalNoteTitle, setModalNoteTitle] = useState("");
  const [modalNoteDescription, setModalNoteDescription] = useState("");

  return {
    modalShow,
    setModalShow,
    modalNoteId,
    setModalNoteId,
    modalNoteTitle,
    setModalNoteTitle,
    modalNoteDescription,
    setModalNoteDescription,
  };
}

export default useNotesModal;
