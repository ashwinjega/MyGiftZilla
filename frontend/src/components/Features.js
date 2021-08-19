import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import gift from "../images/gift.png";
import "../css/Features.css";

function Features() {
  return (
    <Container className="features py-sm-5 overflow-hidden">
      <Row className="justify-content-center">
        <h2>Features</h2> &nbsp;
      </Row>
      <Row className="justify-content-center">
        <Col xs={3}>
          <Card className="cards">
            <Card.Body className="text-center">
              <Card.Title>Connect with Zilla Mates</Card.Title>
              <Card.Text>
                <br></br>Connect with your friends and share your favorite
                products. See what your friends are adding as their must have's.
              </Card.Text>
            </Card.Body>
            <footer>
              <Card.Img
                variant="bottom"
                id="cardImage"
                src={gift}
                alt="gift logo"
              />{" "}
            </footer>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className="cards">
            <Card.Body className="text-center">
              <Card.Title>Create a wishlist</Card.Title>
              <Card.Text>
                <br></br>Add your favorite products to your wishlist. Allow your
                friends and family to have a stress free shopping experience.
              </Card.Text>
            </Card.Body>
            <footer>
              <Card.Img
                variant="bottom"
                id="cardImage"
                src={gift}
                alt="gift logo"
              />{" "}
            </footer>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className="cards">
            <Card.Body className="text-center">
              <Card.Title>Search for gifts</Card.Title>
              <Card.Text>
                <br></br>Stay up to date with what is trending. Search for
                amazing gifts of your favorite brand and stores.
              </Card.Text>
            </Card.Body>
            <footer>
              <Card.Img
                variant="bottom"
                id="cardImage"
                src={gift}
                alt="gift logo"
              />{" "}
            </footer>
          </Card>
        </Col>
      </Row>
      &nbsp;
      <Row className="justify-content-center">
        {" "}
        <Col xs={3}>
          <Card className="cards">
            <Card.Body className="text-center">
              <Card.Title>Save Events</Card.Title>
              <Card.Text>
                <br></br>Maximize convenience for all kinds of occasions such as
                birthdays, weddings, graduations, bridal showers, baby showers,
                anniversaries and more.
              </Card.Text>
            </Card.Body>
            <footer>
              <Card.Img
                variant="bottom"
                id="cardImage"
                src={gift}
                alt="gift logo"
              />{" "}
            </footer>
          </Card>
        </Col>
        <Col xs={3}>
          <Card className="cards">
            <Card.Body className="text-center">
              <Card.Title>Maintain Calendar</Card.Title>
              <Card.Text>
                <br></br>Stay on track and on time. Customize your calendars’
                notifications to your satisfaction and purchase gifts for your
                friends and family well in advance.{" "}
              </Card.Text>
            </Card.Body>
            <footer>
              <Card.Img
                variant="bottom"
                id="cardImage"
                src={gift}
                alt="gift logo"
              />{" "}
            </footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Features;
