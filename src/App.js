import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navi from "./components/navi";
import Home from "./components/pages/home";
import ChatBoot from "./components/pages/chat";
import CardsAI from "./components/cardsAI";
//import AddCards from "./components/addCards";
import Formular from "./components/formular";
import Login from "./components/auth/login";
import { useAuth } from "./components/auth/authContext";
import PrivateRoute from "./components/auth/privateRoute";
import Footer from "./components/footer";
import RutaLipsa from "./components/pages/rutalipsa";

function App() {
  const [lista, setLista] = useState([]);
  const [reaf, setReaf] = useState(false); // Stare pentru a declanșa reîmprospătarea imaginilor
  const { currentUser, loading } = useAuth(); // Utilizează useAuth pentru a accesa loading și currentUser dacă este necesar
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    id: 0,
    imagine: "",
    titlu: "",
    descriere: "",
    url: "",
  });

  const citesteDate = () => {
    fetch("http://localhost:5050/cardsAI")
      .then((response) => response.json())
      .then((data) => {
        console.log("Date primite de la server:", data);
        const updatedData = data.map((item) => ({
          ...item,
          imagine: "http://localhost:5050/imagini/" + item.imagine,
        }));
        console.log("Date primite de la server:", updatedData);
        setLista(updatedData);
      })
      .catch((error) => {
        console.error("Eroare la încărcarea listei:", error);
      });
  };

  useEffect(() => {
    citesteDate();
  }, [reaf]);

  const adaugCards = async (cardItem) => {
    const { titlu, descriere, imagine, url } = cardItem;
    const formData = new FormData();
    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("fisier", imagine);
    formData.append("url", url);
    const config = {
      method: "POST",
      body: formData,
    };
    console.log("Conținutul FormData:", formData);
    try {
      const response = await fetch("http://localhost:5050/adaug", config);
      const data = await response.json();
      console.log("Date primite de la server după adăugare:", data);
      setReaf(!reaf);
      navigate("/add-cards");
    } catch (error) {
      console.error("Eroare la adăugarea cardului:", error);
    }
  };

  const stergeCard = (id) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`http://localhost:5050/sterge/${id}`, config)
      .then((resp) => resp.json())
      .then(() => {
        citesteDate();
      })
      .catch((error) => {
        console.error("Eroare la ștergerea cardului:", error);
      });
  };

  const editeazaCard = (id) => {
    var obiect = lista.find((item) => item.id === id);
    if (obiect) {
      // Extrageți numele imaginii din URL-ul complet
      const numeImagine = obiect.imagine.split("/").pop();
      setEdit({
        id: obiect.id,
        imagine: numeImagine, // Setează imaginea doar cu numele imaginii
        titlu: obiect.titlu,
        descriere: obiect.descriere,
        url: obiect.url,
      });
      navigate("/formular");
    }
  };

  const editCard = (edit) => {
    const { id, titlu, descriere, url, imagine } = edit;
    const formData = new FormData(); // Creează un obiect FormData pentru a trimite datele

    formData.append("titlu", titlu);
    formData.append("descriere", descriere);
    formData.append("url", url);
    formData.append("fisier", imagine); // Adaugă imaginea la FormData cu numele "fisier"

    const config = {
      method: "PATCH",
      body: formData, // Trimite obiectul FormData în corpul cererii
    };

    fetch(`http://localhost:5050/editez/${id}`, config)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Eroare la actualizare.");
        }
        return resp.json();
      })
      .then(() => {
        setReaf(!reaf);
        navigate("/add-cards");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Afișează un indicator de încărcare în timp ce verifici starea de autentificare
  }

  return (
    <>
      <Navi />
      <Container className="py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/collection"
            element={<CardsAI cardsAI={lista} currentUser={false} />}
          />
          <Route path="/login" element={<Login />} />
          {/* Use PrivateRoute for the AddCards route */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/add-cards"
              element={
                <CardsAI
                  currentUser={currentUser}
                  cardsAI={lista}
                  sterge={stergeCard}
                  editeaza={editeazaCard}
                />
              }
            />
            <Route
              path="/formular"
              element={
                <Formular
                  currentUser={currentUser}
                  transmit={adaugCards}
                  obedit={edit}
                  editez={editCard}
                />
              }
            />
          </Route>
          <Route path="/chat" element={<ChatBoot />} />
          <Route path="*" element={<RutaLipsa />} />
        </Routes>

        <hr></hr>
        <Footer />
      </Container>
    </>
  );
}

export default App;

/*
  const editCard = async (id, cardData) => {
    try {
      const response = await fetch(`http://localhost:5050/editez/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Date primite de la server după actualizare:", data);
      // Aici poți gestiona răspunsul primit de la server după actualizare
    } catch (error) {
      console.error("Eroare la actualizarea cardului:", error);
      // Aici poți gestiona erorile întâmpinate în timpul cererii către server
    }
  };*/

/*const citesteLista = async () => {
    const obPromise = await fetch("http://localhost:5050/cardsAI");
    const sirCards = await obPromise.json();
    sirCards.forEach((item) => {
      if (!item.imagine.startsWith("imagini/")) {
        item.imagine = "imagini/" + item.imagine;
      }
      console.log("Calea imaginii:", item.imagine);
    });
    setLista(sirCards);
    console.log("Lista de carduri în pagina principală:", lista);
  };

  useEffect(() => {
    citesteLista();
  }, [reaf]);

  const adaugCards = async (cardItem) => {
    console.log("Datele pentru cererea POST:", cardItem);
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
    const response = await fetch("http://localhost:5050/adaug", config);
    // const mesaj = await obPromise.json();
    setReaf(!reaf); //  Modific "reaf" pentru a forta rularea functiei useEffect(), deci cartilor
  };

  const stergeCard = async (id) => {
    const response = await fetch(`http://localhost:5050/sterge/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setReaf(!reaf);
    } else {
      console.error("Eroare la ștergere.");
    }
  };

  const editeazaCard = (id) => {
    console.log("Editează card cu ID:", id);

    navigate("/login/addCards");
    setObEdit(lista.find((item) => item.id === id)); // Setează cardul pentru editare
  };

  const trimiteEditare = async (id, cardItem) => {
    console.log("Trimite cerere PATCH pentru editarea cardului cu ID:", id);

    const formData = new FormData();
    formData.append("titlu", cardItem.titlu);
    formData.append("descriere", cardItem.descriere);
    formData.append("url", cardItem.url);

    if (cardItem.imagine instanceof File) {
      formData.append("fisier", cardItem.imagine, cardItem.imagine.name);
    } else {
      formData.append("fisier", cardItem.imagine);
    }

    const response = await fetch(`http://localhost:5050/editez/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (response.ok) {
      try {
        const responseData = await response.json();
        console.log("Datele primite de la server:", responseData);

        setLista((prevLista) => {
          const updatedLista = prevLista.map((item) =>
            item.id === responseData.id ? responseData : item
          );
          return updatedLista;
        });
      } catch (error) {
        console.error("Eroare la parsarea răspunsului JSON:", error);
      }
    }
  };*/
