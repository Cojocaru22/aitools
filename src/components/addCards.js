/*import { Form, Button, Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
//import { useNavigate } from "react-router-dom";
import CardsAI from "./cardsAI";

//import { onAuthStateChanged } from "firebase/auth";
//import { auth } from "../firebase";

const AddCards = (props) => {
  console.log("Props în AddCards:", props);
  const { lista, sterge, editez, currentUser, editeaza } = props;

  //const [lista, setLista] = useState([]);
  const [id, setId] = useState(props.obedit.id);
  const [imagine, setImagine] = useState(props.obedit.imagine);
  const ref = useRef();
  const [titlu, setTitlu] = useState(props.obedit.titlu);
  const [descriere, setDescriere] = useState(props.obedit.descriere);
  const [url, setUrl] = useState(props.obedit.url);
  //const navigate = useNavigate();

  const handleFisierImagine = (e) => {
    setImagine(e.target.files[0]);
  };

  console.log("Lista din AddCards:", lista);
  console.log("Sterge din AddCards:", sterge);
  console.log("Editeaza din AddCards:", editeaza);
  console.log("CurrentUser din AddCards:", currentUser);

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
      <div className="py-5">
        <CardsAI
          cardsAI={lista}
          currentUser={currentUser}
          sterge={sterge} // Utilizăm prop-ul 'sterge' în loc de 'stergeCard'
          editeaza={editeaza} // Utilizăm prop-ul 'editez' în loc de 'editCard'
        />
      </div>
    </Container>
  );
};

export default AddCards;
*/
/* useEffect(() => {
    if (obedit) {
      setId(obedit.id);
      setTitlu(obedit.titlu || "");
      setDescriere(obedit.descriere || "");
      setUrl(obedit.url || "");
      if (obedit.imagine instanceof File) {
        setImagine(obedit.imagine);
      }
    } else {
      setId(null);
      setTitlu("");
      setDescriere("");
      setImagine("");
      setUrl("");
    }
  }, [obedit]);
  console.log("Valoarea lui props.lista:", props.lista);

  useEffect(() => {
    if (props.lista) {
      const listaAjustata = props.lista.map((card) => {
        return { ...card, imagine: "/" + card.imagine };
      });
      setLista(listaAjustata);
    }
  }, [props.lista]);
  console.log("Valoarea lui obedit:", obedit);

  const handleFisierImagine = (e) => {
    const fisier = e.target.files[0];
    if (fisier) {
      setImagine(fisier);
      setImaginePath(URL.createObjectURL(fisier));
    }
  };

  const tratezSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted with", { titlu, descriere, url, imagine });
    const cardItem = {
      imagine,
      titlu, //  scriere simplificata pentru titlu: titlu
      descriere,
      url,
    };

    console.log("Valoarea lui id înainte de trimiterea cererii:", id);
    console.log("Valoarea lui cardItem înainte de trimitere:", cardItem);

    if (id === null) {
      console.log("Trimite cerere POST pentru adăugare");
      props.transmit(cardItem);
    } else {
      cardItem.id = id;

      editez(cardItem);
    }
    // Resetare stări după submit
    resetForm();
  };

  const resetForm = () => {
    setId(null);
    setTitlu("");
    setDescriere("");
    setUrl("");
    setImagine(null);
  };*/
