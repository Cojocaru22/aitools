import express from "express";
import cors from "cors";
import fire from "./init.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const port = 5050;
const app = express();

const db = getFirestore(fire);
const webtoolsCollection = collection(db, "webtools");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imaginiDir = path.join(__dirname, "imagini");

app.use(cors());
app.use(express.json());
app.use(fileUpload());
//app.use(express.static("files"));

app.use("/imagini", express.static(imaginiDir));

app.get("/cardsAI", async (req, res) => {
  try {
    const snapshot = await getDocs(webtoolsCollection);
    const cardsAI = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Data sent to client:", cardsAI); // Log the data
    res.status(200).send(cardsAI);
  } catch (error) {
    console.error("Error in /cardsAI:", error); // Log any errors
    res
      .status(500)
      .send({ message: "Eroare la preluarea datelor", error: error.message });
  }
});

app.post("/adaug", async (req, res) => {
  try {
    const fisierPrimit = req.files.fisier;
    const numeFisier = fisierPrimit.name;
    const cale = path.join(imaginiDir, numeFisier);
    await fisierPrimit.mv(cale);

    // Creează un obiect care să conțină datele cardului, inclusiv numele imaginii
    const cardData = {
      titlu: req.body.titlu,
      descriere: req.body.descriere,
      url: req.body.url,
      imagine: numeFisier, // Adaugă doar numele imaginii
    };

    // Adaugă obiectul cardData în baza de date Firebase
    await addDoc(webtoolsCollection, cardData);

    // Returnează toate cardurile actualizate după adăugarea cardului
    const snapshot = await getDocs(webtoolsCollection);
    const cardsAI = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send(cardsAI);
  } catch (error) {
    console.error("Eroare în încărcarea fișierului:", error);
    res.status(500).send({
      message: "Eroare în încărcarea fișierului",
      error: error.message,
    });
  }
});

app.delete("/sterge/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cardItemRef = doc(db, "webtools", id);
    const cardSnapshot = await getDoc(cardItemRef);
    const cardData = cardSnapshot.data();
    const numeImagine = cardData.imagine;

    // Șterge documentul cardului din colecția Firebase
    await deleteDoc(cardItemRef);

    // Șterge imaginea asociată din folderul de imagini
    const caleImagine = path.join(imaginiDir, numeImagine);
    fs.unlinkSync(caleImagine);

    // Returnează toate cardurile actualizate după ștergerea cardului
    const snapshot = await getDocs(webtoolsCollection);
    const cardsAI = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send(cardsAI);
  } catch (error) {
    console.error("Eroare în ștergerea cardului:", error);
    res.status(500).send({
      message: "Eroare în ștergerea cardului",
      error: error.message,
    });
  }
});

app.patch("/editez/:id", async (req, res) => {
  try {
    const id = req.params.id; // Definim id-ul aici
    console.log("ID-ul cardului pentru editare:", id);

    const cardItemRef = doc(db, "webtools", id);

    let numeImagineNoua = null;
    if (req.files && req.files.fisier) {
      const fisierPrimit = req.files.fisier;
      const numeFisier = fisierPrimit.name;
      const cale = path.join(imaginiDir, numeFisier);
      await fisierPrimit.mv(cale);
      numeImagineNoua = numeFisier;
    }

    const cardData = {
      titlu: req.body.titlu,
      descriere: req.body.descriere,
      url: req.body.url,
    };

    if (numeImagineNoua) {
      cardData.imagine = numeImagineNoua;
    }

    await updateDoc(cardItemRef, cardData);

    const snapshot = await getDocs(webtoolsCollection);
    const cardsAI = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send(cardsAI);
  } catch (error) {
    console.error("Eroare în editarea cardului:", error);
    res.status(500).send({
      message: "Eroare în editarea cardului",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Serverul așteaptă comenzi pe portul ${port}`);
});
