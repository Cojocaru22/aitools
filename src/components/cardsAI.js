import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "./cardItem";

const CardsAI = (props) => {
  const lista = props.listaCardsAI.map((item) => {
    return (
      <Col key={item.id}>
        <CardItem
          id={item.id}
          imagine={item.imagine}
          titlu={item.titlu}
          descriere={item.descriere}
          url={item.url}
        />
      </Col>
    );
  });
  return (
    <Container className="my-5 ">
      <Row xs="auto">{lista}</Row>
    </Container>
  );
};

export default CardsAI;
