import { useContext } from "react";
import { NotesContext, NotesModalContext } from "../App";
import NotesModalHeader from "./NotesModalHeader";
import NotesModalBody from "./NotesModalBody";
import NotesModalFooter from "./NotesModalFooter";

function NotesModal() {
  const { modalShow } = useContext(NotesModalContext);

  let cssShowHide =
    modalShow && modalShow === true ? "modal show-modal" : "modal hide-modal";

  return (
    <>
      <style jsx>{`
        .show-modal {
          display: block;
        }
        .hide-modal {
          display: none;
        }
      `}</style>
      <div
        className={cssShowHide}
        id="addnotesmodal"
        role="dialog"
        aria-labelledby="addnotesmodalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
