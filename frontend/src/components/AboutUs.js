import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import goals from "../images/guywithphone.png";
import "../css/AboutUs.css";

function AboutUs() {
  return (
    <div>
      <Container className="features py-sm-5 overflow-hidden">
        <Row className="justify-content-center">
          <h2>About Us</h2> &nbsp;
          <Col md={3}>
            <img id="goalsImage" src={goals} alt="about us" />
          </Col>
          <Col id="mission" md={{ span: 4, offset: 4 }}>
            <h3>Mission Statement</h3>
            <p>
              Remember receiving a gift that you did not like but you pretended
              you did and it’s still in your closet? Or walking into the mall to
              buy a gift for someone and realized you had no clue what to get?
              Once you finally decided on a gift you we're still unsure if the
              recipient would genuinely appreciate it.
            </p>
            <p>
              At Giftzilla, we want to solve this problem and give users the
              ability to give and get gifts that matter the most in one
              centralized location. Ultimately making the experience remarkably
              quick, simple and convenient.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
