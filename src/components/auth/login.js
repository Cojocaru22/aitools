import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import PasswordReset from "./passwordReset";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleClosePasswordReset = () => setShowPasswordReset(false);
  const handleShowPasswordReset = () => setShowPasswordReset(true);
  const firebaseErrorMessages = {
    "auth/invalid-email": "Formatul emailului este invalid.",
    "auth/user-disabled":
      "Contul de utilizator a fost dezactivat de un administrator.",
    "auth/user-not-found":
      "Nu există niciun utilizator corespunzător acestui identificator. Utilizatorul poate fi fost șters.",
    "auth/wrong-password":
      "Parola este incorectă sau utilizatorul nu are o parolă.",
    "auth/invalid-login-credentials":
      "Credențiale de logare invalide. Vă rugăm să verificați datele introduse.",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Resetează mesajul de eroare la fiecare încercare
    // Setează persistența sesiunii pentru autentificare
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // După setarea persistenței, încercăm să autentificăm utilizatorul
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(() => {
        // Utilizatorul este autentificat, redirecționează spre o altă pagină
        navigate("/add-cards"); // Asigură-te că ruta este corectă
        console.log("Autentificare reușită!");
      })
      .catch((error) => {
        const message =
          firebaseErrorMessages[error.code] ||
          "A apărut o eroare la logare. Vă rugăm să încercați din nou mai târziu.";
        setError(message);
        console.error(error);
      });
  };

  return (
    <Container
      fluid
      className="login d-flex justify-content-center align-items-center"
    >
      <Card className="login-card ">
        <Form onSubmit={handleLogin} className="p-4 " autoComplete="off">
          <h2 className="login-title text-center  py-3">Login</h2>
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              name="login_email"
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              name="login_password"
            />
          </Form.Group>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="form-group mt-2">
            <div className="d-flex flex-column">
              <Button
                className="mt-3" // Adds margin on top for spacing between buttons
                variant="success"
                type="submit"
              >
                Log in
              </Button>

              <Button
                className="mt-3" // Ensures spacing above on all screen sizes
                variant="outline-danger"
                onClick={handleShowPasswordReset}
              >
                Forgot password?
              </Button>
            </div>
          </div>
        </Form>

        <PasswordReset
          show={showPasswordReset}
          handleClose={handleClosePasswordReset}
          email={email}
        />
      </Card>
    </Container>
  );
};

export default Login;
