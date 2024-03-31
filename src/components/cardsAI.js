import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "./cardItem";

const CardsAI = (props) => {
  console.log("Lista de carduri în CardsAI:", props.cardsAI);
  const { cardsAI, currentUser, sterge, editeaza } = props; // Destructure editeaza from props
  const lista = cardsAI.map((item) => {
    return (
      <Col key={item.id}>
        <CardItem
          id={item.id}
          imagine={item.imagine}
          titlu={item.titlu}
          descriere={item.descriere}
          url={item.url}
          currentUser={currentUser}
          sterge={sterge}
          editeaza={editeaza}
        />
      </Col>
    );
  });

  return (
    <Container className="my-5">
      <Row xs="auto">{lista}</Row>
    </Container>
  );
};

export default CardsAI;
