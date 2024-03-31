import React, { useState, useEffect } from "react";
import Navi from "./components/navi";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ChatBoot from "./components/pages/chat";
import CardsAI from "./components/cardsAI";
import AddCards from "./components/addCards";

function App() {
  const [lista, setLista] = useState([]);
  const [reaf, setReaf] = useState(false);

  /* let { id } = useParams();*/

  const citesteLista = async () => {
    const obPromise = await fetch("http://localhost:5050/cardsAI");
    const sirCards = await obPromise.json();
    sirCards.forEach((item) => {
      item.imagine = "imagini/" + item.imagine;
    });
    setLista(sirCards); //  Utilizez datele primite
  };

  useEffect(() => {
    citesteLista();
  }, [reaf]);

  const adaugCards = async (cardItem) => {
    const { imagine, titlu, descriere, url } = cardItem;
    const formData = new FormData(); //  Trimit și un fișier, deci utilizam FormData
    formData.append("descriere", descriere);
    formData.append("fisier", imagine);
    formData.append("titlu", titlu);
    formData.append("url", url);
    const config = {
      method: "POST",
      body: formData,
    };
    const obPromise = await fetch("http://localhost:5050/addCards", config);
    // const mesaj = await obPromise.json();
    setReaf(!reaf); //  Modific "reaf" pentru a forta rularea functiei useEffect(), deci cartilor
  };

  /* const adaugCards = (act) => {
    act.id = lista.length + 1;
    setLista([...lista, act]);
  };*/

  return (
    <>
      <Navi />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardsAI listaCardsAI={lista} />} />

          <Route path="/chat" element={<ChatBoot />} />
          <Route
            path="/addCards"
            element={<AddCards transmit={adaugCards} />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
