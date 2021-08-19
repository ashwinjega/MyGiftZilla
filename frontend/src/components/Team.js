import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../css/Team.css";

// Import Images as objects
import ash from "../images/ashwin.jpg";
import jenny from "../images/jenny.jpg";
import shay from "../images/shay.jpg";
import carlos from "../images/carlos.jpg";

function Team() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Image id="ashwin" src={ash} roundedCircle />
        </Col>
        <Col>
          <Image id="jenny" src={jenny} roundedCircle />
        </Col>
        <Col>
          <Image id="shay" src={shay} roundedCircle />
        </Col>
        <Col>
          <Image id="carlos" src={carlos} roundedCircle />
        </Col>
      </Row>
      <Row>
        <Col>
          <p id="names">Ashwin</p>
          <br></br>
          <i id="teamQuotes">
            "With the gift app, there is a lot more meaning behind the why of
            building the application which motivates me much more."
          </i>
        </Col>
        <Col>
          <p id="names">Jenny</p>
          <br></br>
          <i id="teamQuotes">
            "This project will be exciting because it will require major
            creativity, thinking outside the box, web/mobile architecture and
            design patterns as well as human computer interaction in order to
            make it a success."
          </i>
        </Col>
        <Col>
          <p id="names">Shalynn</p>
          <br></br>
          <i id="teamQuotes">
            "As innovation has always been part of my lifestyle,I knew I wanted
            to be a part of this project. I am eager to put in the legwork and
            learn the entire cycle process from concept to deployment."
          </i>
        </Col>
        <Col>
          <p id="names">Carlos</p>
          <br></br>
          <i id="teamQuotes">
            "This motivates me because it allows room for creativity and
            innovation."
          </i>
        </Col>
      </Row>
    </Container>
  );
}

export default Team;
