import React, { useState } from "react";
import "../css/Password.css";
import axios from "axios";

const ForgotPassword = () => {
  const db = require("../components/db.js");
  const [message, setMessage] = useState("");
  var email;

  const test = () => {
    console.log("Testting");
    console.log("Email = " + email.value);
  };
  const doforgot = async (event) => {
    event.preventDefault();
    var obj = { email: email.value };
    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/forgotpassword"),
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
            var user = {
              FirstName: res.FirstName,
              LastName: res.LastName,
              email: res.email,
            };
            localStorage.setItem("user_data", JSON.stringify(user));
            setMessage("");
            window.alert("Email has been sent.");
            window.location.href = "/";
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  };
  return (
    <div className="passwordDiv">
      <div className="card passwordCenter input-field">
        <h2 id="passwordHeader">Request Password Reset</h2>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter email"
          ref={(c) => (email = c)}
        />
        &nbsp;
        <button
          type="button"
          className="resetButton btn-success"
          onClick={doforgot}
        >
          Send Password Reset Email
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
