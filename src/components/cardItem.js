import React from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

const CardItem = (props) => {
  const { imagine, titlu, descriere, url, currentUser, sterge, editeaza, id } =
    props; //  Destructurare props

  console.log("Apelare funcție editeaza din CardItem pentru ID:", id);

  return (
    <Card className="cardItem">
      <Card.Img
        className="cardItem-image"
        variant="top"
        src={imagine}
        alt="collection image"
      />
      <Card.Body>
        <Card.Title className="cardItem-titlu">{titlu}</Card.Title>

        <Card.Text className="cardItem-text">{descriere}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <a href={url} className="btn btn-outline-secondary" role="button">
            Visit Site
          </a>

          {currentUser && (
            <ButtonGroup>
              <Button
                variant="link"
                onClick={() => editeaza(id)}
                id={id}
                className="me-2"
              >
                <BsPencilSquare />
              </Button>
              <Button variant="link" onClick={() => sterge(id)} id={id}>
                <BsTrashFill />
              </Button>
            </ButtonGroup>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
