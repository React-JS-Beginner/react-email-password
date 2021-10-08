import {
  getAuth,
  createUserWithEmailAndPassword,
  /* 
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile, 
  */
} from "firebase/auth";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    console.log("Preventing page reload from the FORM List's submit hitting.");
  };

  return (
    <div>
      <Container className="mt-5 pt-5 w-25">
        <p className="text-primary fs-1">Registration Form</p>
        <Form onSubmit={registrationHandler}>
          {/* Name Field */}
          <Form.Group className="mb-3 mt-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control onBlur={nameChangeHandler} placeholder="First name" />
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={emailChangeHandler}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={passwordChangeHandler}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          {/* Checkbox */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

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
