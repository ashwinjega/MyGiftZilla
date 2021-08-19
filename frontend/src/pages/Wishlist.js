import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import "../css/FakerStyling.css";
//import { CenterFocusStrong } from "@material-ui/icons";

const Wishlist = (props) => {
  const [message, setMessage] = useState("");
  const [items, getItems] = useState("");
  const db = require("../components/db.js");
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
          const allItems = response.data.result;
          getItems(allItems);
          if (allItems.error) {
            setMessage(allItems.error);
          } else {
            console.log(allItems);
            //console.log(res.result[0].email);
            //console.log(res.result[0].id);
            //localStorage.setItem("wishlist", JSON.stringify(response));
            //localStorage.setItem("wishlist", JSON.stringify(allNotes));
          }
        })
        .catch(function (error) {
          setMessage(error);
        });
    } catch (e) {
      setMessage(e.message);
    }
  }

  // Function to display anf filter whislist tems.
  const [searchTerm, setSearchTerm] = useState("");
  const maping = (props, index) => {
    if (items.length > 0) {
      return items
        .filter((item) => {
          if (searchTerm == "") {
            return item;
          } else if (
            item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          ) {
            return item;
          }
        })
        .map((item) => {
          return (
            <div className="note_id" key={item.id}>
              <Col className="col-md-4 offset-md-6">
                <Card style={{ margin: 10, width: "250px", height: "250px" }}>
                  <Card.Body>
                    <img
                      src={item.image}
                      alt="items_images"
                      width="40px"
                      height="40px"
                    />
                    <Card.Text className="item_title">{item.title}</Card.Text>
                    <Card.Text className="item_price">${item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          );
        });
    }
  };

  const displayItems = (allItems) => {
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
        <h4 className="pageHeaders">View and edit your wishlist!</h4>
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
        <>{displayItems(props)}</>
      </div>
    </div>
  );
};

export default Wishlist;
