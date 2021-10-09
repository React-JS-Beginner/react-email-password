import { 
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
  const [isLogin, setIsLogin] = useState(false);

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
    if (isLogin) {
      processLogin(email, password);
    } else {
      registerNewUser(email, password);
    }
  };

  //Create New User Mechanism
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

  //Update User Name Mechanism
  const userName = () => {
    updateProfile(auth.currentUser, { displayName: name }).then((result) => {});
  };

  //Email Verification Mechanism
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      console.log(result);
    });
  };

  //LOG IN Process
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //Toggle CheckBox
  const toggleLogin = (e) => {
    setIsLogin(e.target.checked);
  };

  //Reset Password
  const resetPasswordHandler = () => {
    sendPasswordResetEmail(auth, email).then((result) => {});
  };

  return (
    <div>
      <Container className="mt-5 pt-5 w-25">
        <p className="text-primary fs-1">
          {isLogin ? "Sign In" : "Registration Form"}
        </p>
        <Form onSubmit={registrationHandler}>
          {/* Changing Name field display */}
          {!isLogin && (
            <div>
              {/* Name Field */}
              <Form.Group className="mb-3 mt-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onBlur={nameBlurHandler}
                  placeholder="Enter Full Name"
                />
              </Form.Group>
            </div>
          )}

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
            <Form.Check
              onChange={toggleLogin}
              type="checkbox"
              //Changing CheckBox Comment
              label={!isLogin ? "Already have an account?" : "Let's Go"}
            />
          </Form.Group>

          {/* Display Error */}
          <p className="text-danger">{error}</p>

          {/* Register Button */}
          <Button variant="primary" type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>
          <br />
          <br />
          {isLogin && (
            <div className="d-flex align-items-center">
              <div>
                Forget Password ?
              </div>{" "}
              &nbsp; &nbsp;
              <div>
                <Button onClick={resetPasswordHandler} variant="outline-primary" size="sm">
                  Reset
                </Button>
              </div>
            </div>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default App;
