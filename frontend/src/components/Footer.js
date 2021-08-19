import React from "react";
import "../css/Footer.css";
import { Container } from "react-bootstrap";
import ucf from "../images/ucf.png";

function Footer() {
  return (
    <Container>
      <footer>
        <p id="sd">Senior Design Project</p>
        <img id="ucf" src={ucf} alt="ucf"></img>
        <hr />
        <address>
          University of Central Florida * 4000 Central Florida Boulevard *
          Orlando, Florida 32816
        </address>
      </footer>
    </Container>
  );
}

export default Footer;
