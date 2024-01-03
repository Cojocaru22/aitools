import React from "react";
import { Card, Button } from "react-bootstrap";

const CardItem = (props) => {
  const { imagine, titlu, descriere, url } = props; //  Destructurare props

  const stil = {
    card: { width: "25rem", marginTop: "20px" },
    text: { fontSize: "0.9rem" },
    imagine: { variant: "top" },
  };

  return (
    <Card style={stil.card}>
      <Card.Img style={stil.imagine} src={imagine} />
      <Card.Body>
        <Card.Title>{titlu.toUpperCase()}</Card.Title>
        <Card.Text style={stil.text}>{descriere}</Card.Text>

        <Button variant="primary" href={url}>
          Visit Site
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
