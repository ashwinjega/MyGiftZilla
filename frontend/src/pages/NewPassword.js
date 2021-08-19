import React, { useState } from "react";
import "../css/Password.css";
import axios from "axios";

const NewPassword = () => {
  const db = require("../components/db.js");
  const [message, setMessage] = useState("");

  var password;
  var ls = JSON.parse(localStorage.getItem("user_data"));

  // Function to call api
  const doforgot = async (event) => {
    var obj = { email: ls.email, password: password.value };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/resetpassword"),

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
            setMessage("Password Reset");
          }
          window.alert("Password Reset.");
          window.location.href = "/";
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
        <h2 id="passwordHeader">Reset Your Password</h2>
        <input
          className="inputBox"
          type="password"
          placeholder="New password"
          ref={(c) => (password = c)}
        />
        &nbsp;
        <button
          type="button"
          className="resetButton btn-success"
          onClick={doforgot}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
