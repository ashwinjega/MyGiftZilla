import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Modal } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import AboutUs from "../components/AboutUs";
import Team from "../components/Team";
import axios from "axios";
import "../css/FormValidation.css";
import GoogleLogin from "react-google-login";

const LandingPage = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showS, setShowS] = useState(false);
  const handleCloseS = () => setShowS(false);
  const handleShowS = () => setShowS(true);

  var firstName;
  var lastName;
  var email;
  var userName;
  var password;
  var confirmPass;
  const [message, setMessage] = useState("");
  const db = require("../components/db.js");
  // Sign up function is called on sign up modal
  const signUp = async (event) => {
    event.preventDefault();

    var obj = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      login: userName.value,
      password: password.value,
      confirmPass: confirmPass.value,
    };
    var js = JSON.stringify(obj);

    // Console Log to see Values being entered
    /*
    console.log(obj.firstname);
    console.log(obj.lastname);
    console.log(obj.email);
    console.log(obj.password);
    console.log(obj.confirmPass);*/

    let regexPassword = /[!@#$%^*]/;
    var regexNumbers = /[0-9]/;
    let regexLowerCase = /[a-z]/;
    let regexCapital = /[A-Z]/;

    // Logic for validation Checks

    // First Name Validation
    if (obj.firstname.length <= 1) {
      setErrorMessage(
        firstName,
        "First Name cannot be blank and must be greater then 1 character"
      );
    } else {
      setSuccessMessage(firstName);
    }

    // Last Name Validation
    if (obj.lastname.length <= 1) {
      setErrorMessage(
        lastName,
        "Last Name cannot be blank and must be greater then 1 character"
      );
    } else {
      setSuccessMessage(lastName);
    }

    // Email Validation Checks for blank or uses Regex function to see if a valid email has been entered
    if (obj.email === "") {
      setErrorMessage(email, "Email can not be blank");
    } else if (!isEmail(obj.email)) {
      setErrorMessage(email, "Not valid (Example: Email@mail.com)");
    } else {
      setSuccessMessage(email);
    }

    // User Name Validation
    if (obj.login.length <= 1) {
      setErrorMessage(
        userName,
        "Username cannot be blank and must be greater then 1 character"
      );
    } else {
      setSuccessMessage(userName);
    }

    // Password Validation -
    //Checks for empty password, password at least 8 characters long , Password must have at least 1 Capital letter
    // 1 LowerCase , 1 number, 1 special character, and must match
    if (obj.password === "") {
      setErrorMessage(password, "Password cannot be left blank");
    } else if (obj.password.search(regexNumbers) === -1) {
      setErrorMessage(password, "Password must contain at least 1 number");
    } else if (obj.password.search(regexLowerCase) === -1) {
      setErrorMessage(
        password,
        "Password must contain at least 1 Lower-Case Letter"
      );
    } else if (obj.password.search(regexCapital) === -1) {
      setErrorMessage(
        password,
        "Password must contain at least 1 Capital Letter"
      );
    } else if (obj.password.search(regexPassword) === -1) {
      setErrorMessage(
        password,
        "Password must contain at least 1 special Character ( !,@,#,$,%,^,&,* )"
      );
    } else if (obj.password.length < 8) {
      setErrorMessage(password, "Password must be at least 8 Characters");
    } else {
      setSuccessMessage(password);
    }

    // Validation for Confirm Password
    if (obj.confirmPass === "") {
      setErrorMessage(confirmPass, "Confirm password cannot be left blank");
    } else if (obj.confirmPass.search(/[0-9]/) === -1) {
      setErrorMessage(
        confirmPass,
        "Confirm Password must contain at least 1 number"
      );
    } else if (obj.confirmPass.search(regexLowerCase) === -1) {
      setErrorMessage(
        confirmPass,
        "Confirm Password must contain at least 1 Lower-Case Letter"
      );
    } else if (obj.confirmPass.search(regexCapital) === -1) {
      setErrorMessage(
        confirmPass,
        "Confirm Password must contain at least 1 Capital Letter"
      );
    } else if (obj.confirmPass.search(regexPassword) === -1) {
      setErrorMessage(
        confirmPass,
        "Confirm Password must contain at least 1 special Character ( !,@,#,$,%,^,* )"
      );
    } else if (obj.confirmPass.length < 8) {
      setErrorMessage(confirmPass, "Password must be at least 8 Characters");
    } else if (obj.password !== obj.confirmPass) {
      setErrorMessage(confirmPass, "passwords do not match");
    }

    // if validation is passed we push a new user into the data base
    else {
      setSuccessMessage(confirmPass);
      try {
        // Axios code follows
        var config = {
          method: "post",
          url: db.buildPath("api/users"),

          headers: {
            "Content-Type": "application/json",
          },
          data: js,
        };

        axios(config)
          .then(function (response) {
            var res = response.data;
            if (res.error) {
              setMessage(res.error);
            } else {
              if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
              } else {
                setMessage("User has been added");
              }
            }
          })
          .catch(function (error) {
            setMessage(error);
          });
      } catch (e) {
        setMessage(e.message);
      }
      handleCloseS();
    }
  };
  const doLogin = async (event) => {
    event.preventDefault();

    var obj = {
      email: email.value,
      password: password.value,
    };
    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/auth"),
        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            setMessage(res.error);
            console.log(res.error);
          } else {
            var user = {
              FirstName: res.FirstName,
              LastName: res.LastName,
              email: res.email,
            };
            var emails = {
              email: res.email,
            };
            localStorage.setItem("user_data", JSON.stringify(user));
            localStorage.setItem("email", JSON.stringify(emails));
            setMessage("");
            window.location.href = "/home";
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  };

  const responseGoogle = (response) => {
    var profile = response.getBasicProfile();
    var emails = profile.getEmail();
    var passwords = profile.getId();

    var obj = {
      email: emails,
      password: passwords,
    };
    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/auth"),
        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            setMessage(res.error);
            console.log(res.error);
          } else {
            var user = {
              FirstName: res.FirstName,
              LastName: res.LastName,
              email: res.email,
            };
            var emails = {
              email: res.email,
            };
            localStorage.setItem("user_data", JSON.stringify(user));
            localStorage.setItem("email", JSON.stringify(emails));
            setMessage("");
            window.location.href = "/home";
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  };

  const signupgoogle = (response) => {
    var profile = response.getBasicProfile();
    var passwords = profile.getId();
    var firstName = profile.getName();
    var lastName = profile.getName();
    var emails = profile.getEmail();
    var obj = {
      firstname: firstName,
      lastname: lastName,
      email: emails,
      login: firstName,
      password: passwords,
      confirmPass: passwords,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/users"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            setMessage(res.error);
          } else {
            if (res.error.length > 0) {
              setMessage("API Error:" + res.error);
            } else {
              setMessage("User has been added");
            }
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
    handleCloseS();
  };
  return (
    <div className="Landing">
      {/* --------------------------------Navbar----------------------------------------- */}
      <div className="Navbar">
        <Navbar>
          <Nav className="justify-content-center" style={{ width: "100%" }}>
            <Nav.Link className="navlink" href="#howitworks">
              How it works
            </Nav.Link>
            <Nav.Link className="navlink" href="#features">
              Features
            </Nav.Link>
            <Nav.Link className="navlink" href="#aboutus">
              About us
            </Nav.Link>
            <Nav.Link className="navlink" href="#team">
              Team
            </Nav.Link>
          </Nav>
          {/* Login and signup buttons */}
          <Button
            className="justify-content-end "
            variant="success"
            size="sm"
            onClick={handleShow}
          >
            Login
          </Button>
          &nbsp;
          <Button
            className="justify-content-end "
            variant="success"
            size="sm"
            onClick={handleShowS}
          >
            Signup
          </Button>
          &nbsp;
        </Navbar>
      </div>

      {/* -------------------------------------------Login Modal---------------------------------------------------*/}
      <section id="modalLogin">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={(c) => (email = c)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={(c) => (password = c)}
                />
              </Form.Group>
            </Form>
            <a href="/ForgotPassword">Forgot Password?</a>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={doLogin}>
              Submit
            </Button>
            <GoogleLogin
              clientId="288606113385-qrd5qqrumuu83oumv5rdhcpaf9cp8unj.apps.googleusercontent.com"
              buttonText="Login with Google"
              autoLoad={false}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Modal.Footer>
        </Modal>
      </section>

      {/*--------------------------------------------Sign Up Modal----------------------------------------------- */}
      <section id="modalSignUp">
        <Modal show={showS} onHide={handleCloseS}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3 " controlId="firstName">
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  className="login-input"
                  type="fname"
                  ref={(c) => (firstName = c)}
                />
                <div>
                  <small className="smallHidden"> Error Message</small>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last Name"
                  className="login-input"
                  type="lname"
                  ref={(c) => (lastName = c)}
                />
                <div>
                  <small className="smallHidden"> Error Message</small>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="emailSignUp">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email"
                  className="login-input"
                  type="email"
                  ref={(c) => (email = c)}
                />
                <div>
                  <small className="smallHidden"> Error Message</small>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="usernameSignup">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Username"
                  className="login-input"
                  type="username"
                  ref={(c) => (userName = c)}
                />
                <div>
                  <small className="smallHidden"> Error Message</small>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="passwordSignUp">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  placeholder="Password"
                  className="login-input"
                  type="password"
                  ref={(c) => (password = c)}
                />
                <div>
                  <small className="smallHidden"> Error Message</small>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  placeholder="Confirm Password"
                  className="login-input"
                  type="password"
                  ref={(c) => (confirmPass = c)}
                />
                <div>
                  <small className="smallHidden"> Error Message</small>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={signUp}>
              Register
            </Button>
            <GoogleLogin
              clientId="288606113385-qrd5qqrumuu83oumv5rdhcpaf9cp8unj.apps.googleusercontent.com"
              buttonText="Sign up with google"
              autoLoad={false}
              onSuccess={signupgoogle}
              onFailure={signupgoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Modal.Footer>
        </Modal>
      </section>

      {/* ---------------------------------------------------Page Sections------------------------------------- */}

      <header className="page-header">
        <Header />
      </header>

      <section id="howitworks">
        <HowItWorks />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="aboutus">
        <AboutUs />
      </section>

      <section id="team">
        <Team />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

// Function that uses Regex to validate an email
function isEmail(email) {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

// Function to set error message for validation

function setErrorMessage(input, message) {
  // Access parent element such as the div container holding values
  const formControl = input.parentElement;

  // Access <small> element that will display the error and asign it to const
  const small = formControl.querySelector("small");

  // setting class name as error  so CSS enables visbility and red color scheme for error message
  small.className = "errorSmall";

  // assign the message we want to display
  small.innerText = message;
}

function setSuccessMessage(input) {
  // Access parent element such as the div container holding values
  const formControl = input.parentElement;

  // Access <small> element that will be invisible when user enters information correctly
  const small = formControl.querySelector("small");

  // setting class name so CSS enables hidden visibility
  small.className = "smallHidden";
}

export default LandingPage;
