import Button from "@/components/Button";
import Modal, { ModalProps } from "@/components/Modal";
import React from "react";

const InformationModal: React.FC<ModalProps> = ({ ...props }) => {
  return (
    <Modal {...props}>
      <p className="p-2">
        fSBT refers to an SBT that can be transacted only n times. Original SBT
        is a token with no transmission possibility at all, but fSBT is a form
        that changes to SBT after transaction.
      </p>
      <Button onClick={() => props.onClose?.()}>Got it!</Button>
    </Modal>
  );
};

export default InformationModal;
