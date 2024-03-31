import express from "express";
import cors from "cors";
import fire from "./init.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const port = 5050;
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("files"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = getFirestore(fire);

app.get("/cardsAI", async (req, res) => {
  const listaCards = await getDocs(collection(db, "webtools"));
  let listaNoua = await listaCards.docs.map((item) => {
    let cardItem = item.data(); //  Creez un obiect nou
    cardItem.id = item.id; // adaug ID-ul în obiectul " " (trebuie!)
    return cardItem;
  });
  res.status(200).send(JSON.stringify(listaNoua));
});

app.post("/addCards", async (req, res) => {
  //  Extrag numele fisierului
  const numeFisier = req.files.fisier.name;
  req.body.imagine = numeFisier; //  Adaug in "req.body" campul "coperta" (denumirea fisierului)
  const docRef = await addDoc(collection(db, "webtools"), req.body);
  const id = docRef.id;

  //  Transfer fisierul in directorul /imagini
  const fisierPrimit = req.files.fisier;
  const cale = __dirname + "/../public/imagini/" + numeFisier; //  Se va edita după generarea versiunii finale!
  fisierPrimit.mv(cale);
  res.status(200).send(JSON.stringify({ mesaj: "Adăugare reușita.", id }));
});

app.delete("/sterge/:id", async (req, res) => {
  const id = req.params.id; //  Preiau valoarea parametrului "id"
  const docRef = doc(db, "webtools", id);
  const rezultat = await deleteDoc(docRef);
  res.status(200).send(JSON.stringify(rezultat));
});

app.listen(port, () => {
  console.log(`Serverul așteaptă comenzi pe portul ${port}`);
});
