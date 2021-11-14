import { useState } from "react";

function useNotesModal() {
  const states = {
    modalShow: useState(false),
    modalNoteId: useState(0),
    modalNoteTitle: useState(""),
    modalNoteDescription: useState(""),
    modalNoteTagIds: useState([]),
  };

  return Object.fromEntries(
    Object.entries(states).map(function ([k, [value, set]]) {
      return [k, { value, set }];
    })
  );
}

export default useNotesModal;

//
// export const DELAYMS = 2000;
//
// function useNotesModal() {
//   const [showModal, setShowModal] = useState(false);
//   const [modalNoteId, setModalNoteId] = useState(0); // if 0, means create note in modal
//   const [modalNoteTitle, setModalNoteTitle] = useState("");
//   const [modalNoteDescription, setModalNoteDescription] = useState("");
//   const [modalNoteTagIds, setModalNoteTagIds] = useState([]);
//
//   return {
//     showModal,
//     setShowModal,
//     modalNoteId,
//     setModalNoteId,
//     modalNoteTitle,
//     setModalNoteTitle,
//     modalNoteDescription,
//     setModalNoteDescription,
//     modalNoteTagIds,
//     setModalNoteTagIds,
//   };
// }
// export default useNotesModal;
