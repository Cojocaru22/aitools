import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Modal, Button } from "react-bootstrap";

const PasswordReset = ({ show, handleClose, email }) => {
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
      handleClose(); // Close the modal
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Resetarea parolei</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Vă trimitem un link pe email pentru a crea o nouă parolă.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button
          className="px-5"
          variant="success"
          onClick={handlePasswordReset}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordReset;
