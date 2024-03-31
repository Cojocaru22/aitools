import { Form, Button, Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
//import { useNavigate } from "react-router-dom";
//import CardsAI from "./cardsAI";

const Formular = (props) => {
  const { currentUser } = props;
  const [id, setId] = useState(props.obedit.id);
  const [imagine, setImagine] = useState(props.obedit.imagine);
  const ref = useRef();
  const [titlu, setTitlu] = useState(props.obedit.titlu);
  const [descriere, setDescriere] = useState(props.obedit.descriere);
  const [url, setUrl] = useState(props.obedit.url);

  const handleFisierImagine = (e) => {
    setImagine(e.target.files[0]);
  };

  const tratezSubmit = (evt) => {
    evt.preventDefault();
    const cardItem = { imagine, titlu, descriere, url };
    console.log("Card item:", cardItem);
    if (id === 0) {
      props.transmit(cardItem);
    } else {
      cardItem.id = id;
      props.editez(cardItem);
    }
    setTitlu("");
    setDescriere("");
    setImagine(null);
    ref.current.value = "";
    setUrl("");
  };

  console.log("Props în AddCards:", props);
  console.log("Valoarea lui obedit:", props.obedit);
  return (
    <Container className="py-5">
      <h2 className="mt-5 text-center">
        {id === 0 ? "Adaugare noua" : "Editare card"}
      </h2>
      <hr />
      {currentUser && (
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
              className="mb-3"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>
          <Button className="mb-3" variant="success" size="lg" type="submit">
            Adaugă
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Formular;
