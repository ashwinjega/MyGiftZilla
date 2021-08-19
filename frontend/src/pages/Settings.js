import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import avatar from "../images/defaultAvatar.png";
import "../css/Settings.css";
import { Button } from "react-bootstrap";
import axios from "axios";
const Settings = () => {
  const [message, setMessage] = useState("");
  const [items, getItems] = useState("");
  const [{ alt, src }, setImg] = useState({
    src: avatar,
    alt: "Upload an Image",
  });
  const db = require("../components/db.js");
  useEffect(() => {
    getuserinfo();
  }, []);
  function getuserinfo() {
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      email: ls.email,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/pullinfo"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const userallItems = response.data.result;
          getItems(userallItems);
          if (userallItems.error) {
            setMessage(userallItems.error);
          } else {
            //console.log(userallItems);
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/pullimage"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const imageallItems = response.data.result;
          //setImg(imageallItems);
          // if (imageallItems) {
          //   setImg({
          //     src: ,
          //     alt: e.target.files[0].name,
          //   });
          // }
          if (imageallItems.error) {
            setMessage(imageallItems.error);
          } else {
            //console.log(imageallItems);
  
            console.log(imageallItems[0].src);
            setImg({
              src: imageallItems[0].src,
              alt: imageallItems[0].alt,
            });
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  }

  const handleImg = (e) => {
    const db = require("../components/db.js");

    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      var ls = JSON.parse(localStorage.getItem("email"));
      console.log(e.target.files[0]);
      var obj = {
        email: ls.email,
        src: e.target.files[0],
        alt: e.target.files[0].name,
      };
      var js = JSON.stringify(obj);
      //console.log(obj);
      //setImg(obj);
      try {
        // Axios code follows
        var config = {
          method: "post",
          url: db.buildPath("api/addimage"),

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
            }
          })
          .catch(function (error) {
            setMessage(error);
          });
      } catch (e) {
        setMessage(e.message);
      }
    }
  };

  const userCard = (userInfo) => {
    if (items.length > 0) {
      return items.map((item) => {
        return (
          <div className="card mx-auto align-items-center" id="settingsCard">
            <form id="settingsForm">
              <h1>User profile</h1>
              <div className="avatarUpload">
                <label className="custom-file-upload fas">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id="photo"
                    className="visually-hidden"
                    onChange={handleImg}
                  />

                  <img className="card-img" src={src} alt={alt} />
                </label>
              </div>

              <div className="form-group row" id="settingsFormRow">
                <label className="col">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={item.firstName + " " + item.lastName}
                ></input>
              </div>

              <div className="form-group row" id="settingsFormRow">
                <label className="col">Email</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={item.email}
                ></input>
              </div>

              <div className="form-group row" id="settingsFormRow">
                <label className="col">Password</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="**********"
                ></input>
              </div>

              <Button variant="primary" type="submit" className="save">
                Save{" "}
              </Button>
            </form>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <Navigation />
      <>{userCard()}</>
    </div>
  );
};

export default Settings;
