import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();

  const nameBlurHandler = (e) => {
    setName(e.target.value);
  };
  const emailBlurHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordBlurHandler = (e) => {
    setPassword(e.target.value);
  };

  //Form Handler
  const registrationHandler = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    /*console.log("Preventing page reload from the FORM List's submit hitting.");*/
    registerNewUser(email, password);
  };

  //createUserWithEmailAndPassword Mechanism
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(""); //To clear the previous error
        userName();
        verifyEmail();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //updateProfile Mechanism
  const userName = () => {
    updateProfile(auth.currentUser, { displayName: name }).then((result) => {});
  };

  //sendEmailVerification Mechanism
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      console.log(result);
    });
  };

  return (
    <div>
      <Container className="mt-5 pt-5 w-25">
        <p className="text-primary fs-1">Registration Form</p>
        <Form onSubmit={registrationHandler}>
          {/* Name Field */}
          <Form.Group className="mb-3 mt-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onBlur={nameBlurHandler}
              placeholder="Enter Full Name"
            />
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onBlur={emailBlurHandler}
              type="email"
              placeholder="Enter Email"
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={passwordBlurHandler}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          {/* Checkbox */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          {/* Display Error */}
          <p className="text-danger">{error}</p>

          {/* Register Button */}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;
