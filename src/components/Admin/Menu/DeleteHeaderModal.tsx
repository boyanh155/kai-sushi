import { Modal } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const DeleteHeaderModal = ({ open, handleClose }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteHeaderModal;
