import React from "react";
import { Container, Col, Row, Image, Card, Nav, Button } from "react-bootstrap";
import Typed from "react-typed";

const Home = () => {
  const stil = {
    h1: { fontWeigt: "light" },
    p: { textAlign: "justify" },
    typed: {
      //display: "flex",
      //justifyContent: "center",
      //alignItems: "center",
      //textAlign: "center",
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "1.5rem",
    },
  };

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col sm={7}>
            <Image
              className="my-3 "
              src="./imagini/a4.png"
              fluid
              rounded
            ></Image>
          </Col>
          <Col
            sm={5}
            className="d-flex justify-content-center align-items-center "
          >
            <Typed
              style={stil.typed}
              strings={["Front-end", "Backend", "Tool AI", "Design UI/UX"]}
              typeSpeed={40}
              backSpeed={60}
              loop
            />
          </Col>
        </Row>
        <Row className="text-center">
          <h1 style={stil.h}>Platforma Creativă Web</h1>
          <p>
            Resurse și Instrumente Esențiale pentru Transformarea Ideilor în
            Realitate Digitală
          </p>
        </Row>
        <Row className="px-2 my-5">
          <Col sm={7}>
            <Image src="./imagini/w1.png" fluid rounded></Image>
          </Col>
          <Col sm={5}>
            <h2 style={stil.h}>Software Development</h2>
            <p style={stil.p}>
              Este o platformă integrală destinată dezvoltatorilor web, oferind
              o gamă extensivă de unelte și resurse pentru toate fazele
              dezvoltării web. Concepută pentru a servi atât începătorii, cât și
              profesioniștii experimentați, această platformă reprezintă un hub
              centralizat ce cuprinde instrumente pentru front-end, back-end,
              design UI/UX și integrări AI. Misiunea este de a simplifica și
              eficientiza procesul de dezvoltare web, oferind o platformă unică
              unde dezvoltatorii pot găsi toate uneltele necesare pentru a-și
              transforma ideile în realitate. Indiferent dacă este vorba de
              crearea unui site web de prezentare, a unei aplicații complexe sau
              a unei soluții inovatoare bazate pe AI, aceasta platformna este
              partenerul ideal pentru orice dezvoltator care dorește să atingă
              excelența în domeniul web.
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <Card>
            <Card.Header>
              <h3>Tooluri si tehnologii folosite</h3>
              <Nav
                variant="pills"
                defaultActiveKey="#first"
                className="text-center"
              >
                <Nav.Item>
                  <Nav.Link href="/cards">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#front-end">Front-end</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="backend">Backend</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="AI">AI</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link href="#disabled" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                Procesul de dezvoltare a unei aplicații software moderne poate
                fi separat în două părți care pot fi tratate separat, folosind
                limbaje și tehnologii diferite: componenta de back-end,
                incluzând prelucrări de date, construirea soluțiilor și
                accesarea bazelor de date (componenta zisă de bussiness-logic)
                și componenta de front-end, destinată reprezentării pe ecran a
                datelor și afișării instrumentelor necesare interacționării cu
                aplicația. În aplicațiile actuale această componentă se
                realizează folosind framework-uri bazate pe JavaScript: Angular,
                React, Vue ș.a.. Separarea celor două componente permite
                realizarea și testarea lor separată, cu instrumentele cele mai
                adecvate. Pentru integrarea celor două părți este necesară
                respectarea unei singure condiții: definirea specificațiilor
                pentru componenta de back-end care să permită conectarea
                naturală cu partea de front end. De obicei componenta de
                back-end este defintă ca serviciu web. Acest lucru presupune
                conformarea acestei componente la cerințele unui standard
                denumit Representational State Transfer (prescurtat REST).
              </Card.Text>
              <Button variant="primary">Detalii</Button>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Col>
            <Card xs={1} md={1} className="g-4">
              <Card.Img variant="top" src="./imagini/w1.png" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>

                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "25rem" }}>
              <Card.Img variant="top" src="./imagini/w1.png" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>

                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "25rem" }}>
              <Card.Img variant="top" src="./imagini/w1.png" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>

                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
