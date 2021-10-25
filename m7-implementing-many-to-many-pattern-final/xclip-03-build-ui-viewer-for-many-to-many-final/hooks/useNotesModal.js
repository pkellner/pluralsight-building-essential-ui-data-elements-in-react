import { useState } from "react";

function useNotesModal() {
  const [modalShow, setModalShow] = useState(false);

  const [modalNoteId, setModalNoteId] = useState(0);
  const [modalNoteTitle, setModalNoteTitle] = useState("");
  const [modalNoteDescription, setModalNoteDescription] = useState("");
  const [modalNoteTagIds, setModalNoteTagIds] = useState([]);

  return {
    modalShow,
    setModalShow,

    modalNoteId,
    setModalNoteId,
    modalNoteTitle,
    setModalNoteTitle,
    modalNoteDescription,
    setModalNoteDescription,
    modalNoteTagIds,
    setModalNoteTagIds,
  };
}

export default useNotesModal;
