import { Form, Button } from "react-bootstrap";
import React, { useState, useRef } from "react";

function AddCards(props) {
  //const [id, setId] = useState(props.obedit.id);
  const [imagine, setImagine] = useState("");
  const ref = useRef();

  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [url, setUrl] = useState("");

  const stil = {
    h2: { textAlign: "center" },
  };

  const tratezSubmit = (evt) => {
    evt.preventDefault();
    const cardItem = { imagine, titlu, descriere, url };
    props.transmit(cardItem); //  Transmit spre App obiectul "activitate"
    //  Golesc controalele formularului
    setImagine(null);
    ref.current.value = "";
    setTitlu("");
    setDescriere("");
    setUrl("");
  };

  const handleFisierImagine = (e) => {
    setImagine(e.target.files[0]);
  };

  return (
    <>
      <h2 className="mt-4" style={stil.h2}>
        Formular
      </h2>
      <hr />
      <Form onSubmit={tratezSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Imaginea (maximum 1MB):</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFisierImagine(e)}
            ref={ref}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Titlu:</Form.Label>
          <Form.Control
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descriere</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Introduceți URL-ul aici:</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddCards;
