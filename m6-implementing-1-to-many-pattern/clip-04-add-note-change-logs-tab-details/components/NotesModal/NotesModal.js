import NotesModalHeader from "./NotesModalHeader";
import NotesModalBody from "./NotesModalBody";
import NotesModalFooter from "./NotesModalFooter";
import { NotesModalContext } from "../App";
import { useContext } from "react";

function NotesModal() {
  const { modalShow } = useContext(NotesModalContext);
  const cssShowHide =
    modalShow && modalShow === true ? "modal show-modal" : "modal hide-modal";

  return (
    <>
      <style jsx>
        {`
          .show-modal {
            display: block;
          }
          .hide-modal {
            display: none;
          }
        `}
      </style>
      <div role="dialog" className={cssShowHide}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <NotesModalHeader />
            <NotesModalBody />
            <NotesModalFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesModal;
