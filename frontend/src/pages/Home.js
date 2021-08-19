import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import "../css/FakerStyling.css";

const Home = (props) => {
  const [message, setMessage] = useState("");
  const db = require("../components/db.js");
  const [notes, getNotes] = useState("");

  // UnseEffect to get data from teh Fake API
  useEffect(() => {
    getAllNotes();
  }, []);

  // Call to the rest API
  const getAllNotes = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const allNotes = response.data;
        getNotes(allNotes);
        return allNotes;
      })
      .catch((error) => console.error(`Error:${error}`));
  };

  // Code is repeated in order to know which ones have been already clicked.
  const [items, getItems] = useState("");

  useEffect(() => {
    getAllItems();
  }, []);
  function getAllItems() {
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      email: ls.email,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios code follows
      var config = {
        method: "post",
        url: db.buildPath("api/wishlistfind"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const wishedItems = response.data.result;
          getItems(wishedItems);
          if (wishedItems.error) {
            setMessage(wishedItems.error);
          } else {
            console.log(wishedItems);
            //console.log(res.result[0].email);
            //console.log(res.result[0].id);
            //localStorage.setItem("wishlist", JSON.stringify(response));
            localStorage.setItem("wishlist", JSON.stringify(wishedItems));
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  }

  //
  const handleButton = (itemSelected) => {
    //console.log("Selected Wishlist Item");
    var checkBox = document.getElementById(itemSelected.id);

    // If the item is selected add to database.
    if (checkBox.checked == true) {
      console.log("Check Box is true");
      console.log(itemSelected.id);

      // Call to database to add item.
      var ls = JSON.parse(localStorage.getItem("email"));
      var obj = {
        email: ls.email,
        id: itemSelected.id,
        title: itemSelected.title,
        price: itemSelected.price,
        description: itemSelected.description,
        category: itemSelected.category,
        image: itemSelected.image,
      };
      var js = JSON.stringify(obj);
      try {
        // Axios code follows
        var config = {
          method: "post",
          url: db.buildPath("api/wishlist"),

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
                setMessage("wishlist item has been added");
              }
            }
          })
          .catch(function (error) {
            setMessage(error);
          });
      } catch (e) {
        setMessage(e.message);
      }
    } else {
      //TODO: Remove item from users whislist
      console.log("Check Box is false");
      console.log(itemSelected.id);
      var removels = JSON.parse(localStorage.getItem("email"));
      var removeobj = {
        email: removels.email,
        id: itemSelected.id,
      };
      var jsremove = JSON.stringify(removeobj);
      try {
        // Axios code follows
        var config = {
          method: "post",
          url: db.buildPath("api/removewishlist"),

          headers: {
            "Content-Type": "application/json",
          },
          data: jsremove,
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
                setMessage("wishlist item has been deleted");
              }
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

  // Checks wich items have been selected by user.
  const handleCheck = (itemSelected) => {
    var wishedItems = JSON.parse(localStorage.getItem("wishlist"));

    for (let i = 0; i < wishedItems.length; i++) {
      if (wishedItems[i].id == itemSelected) {
        return true;
      }
    }
    return false;
  };

  // Function to display the items from the store
  const [searchTerm, setSearchTerm] = useState("");
  const maping = (props, index) => {
    if (notes.length > 0) {
      return notes
        .filter((note) => {
          if (searchTerm == "") {
            return note;
          } else if (
            note.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          ) {
            return note;
          }
        })
        .map((note) => {
          return (
            <div className="note_id" key={note.id}>
              <Col className="col-md-4 offset-md-6">
                <Card
                  style={{
                    margin: 10,
                    width: "250px",
                    height: "250px",
                  }}
                >
                  <Card.Body>
                    <img
                      src={note.image}
                      alt="notes_images"
                      width="40px"
                      height="40px"
                    />
                    <Card.Text className="item_title">{note.title}</Card.Text>
                    <Card.Text className="item_price">${note.price}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Form.Check
                      variant="primary"
                      id={note.id}
                      onClick={handleButton.bind(this, note)}
                      checked={handleCheck(note.id)}
                    />
                  </Card.Footer>
                </Card>
              </Col>
            </div>
          );
        });
    }
  };

  // It displays all items
  const displayNotes = (props, index) => {
    return (
      <div className="mapDiv">
        <>{maping(props)}</>
      </div>
    );
  };

  return (
    <div>
      <Navigation />
      <div className="backgroundDiv">
        <h4 className="pageHeaders">
          Search your favorite items and add to your wishlist!
        </h4>
        {/*----------------------- Search Container-------------------------- */}
        <Container>
          <Row className="justify-content-md-center">
            <Col md={{ span: 8 }} className=" my-5">
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button variant="outline-success">Search</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <>{displayNotes(props)}</>
      </div>
    </div>
  );
};

export default Home;
