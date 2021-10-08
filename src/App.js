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
  const [error, setError] = useState('');

  const auth = getAuth();

  /* const nameChangeHandler = (e) => {
    setName(e.target.value);
  }; */
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    // console.log(name);
    console.log(email);
    console.log(password);
    /*console.log("Preventing page reload from the FORM List's submit hitting.");*/
    registerNewUser(email, password);

  };

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
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
              /* onBlur={nameChangeHandler} */
              placeholder="Enter Full Name"
            />
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onBlur={emailChangeHandler}
              type="email"
              placeholder="Enter Email"
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
