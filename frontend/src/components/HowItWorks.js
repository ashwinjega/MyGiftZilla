import React from "react";
import Card from "react-bootstrap/Card";
//import CardDeck from "react-bootstrap/CardDeck";
import { Container, Row, Col } from "react-bootstrap";
import "../css/HowItWorks.css";
import gift from "../images/gift.png";

function HowItWorks() {
  return (
    <Container className="howitworks py-sm-5 overflow-hidden">
      <Row className="justify-content-center">
        <h2>How it works</h2> &nbsp;
      </Row>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <Col xs={4}>
          <Card className="text-center" border="dark">
            <Card.Body>
              <Card.Title className="text-center">Browse Products</Card.Title>
              <Card.Text>
                <br></br>Search and discover exclusive gifts ideas. Save items
                for later, to put them aside as a potential gift for someone
                else or add them to your own wish list.
              </Card.Text>
              <footer>
                <small className="text-muted">
                  <img id="cardImage" src={gift} alt="gift logo" />{" "}
                </small>
              </footer>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={4}>
          <Card className="text-center" border="dark">
            <Card.Body>
              <Card.Title>Connect with friends</Card.Title>
              <Card.Text>
                <br></br>Find and follow your friends. See what they post on
                their wishlist and send them gifts of their choosing. Make your
                gifts foolproof, meaningful, and special.
              </Card.Text>
              <footer>
                <small className="text-muted">
                  <img id="cardImage" src={gift} alt="gift logo" />{" "}
                </small>
              </footer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className="text-center" border="dark">
            <Card.Body>
              <Card.Title>Purchase gift</Card.Title>
              <Card.Text>
                <br></br>Buy gifts in person, online or however works for you.
                Recieve alerts to set up purchase in advance or same day. Choose
                to ship directly to the recipent or to you.
              </Card.Text>
              <footer>
                <small className="text-muted">
                  <img id="cardImage" src={gift} alt="gift logo" />{" "}
                </small>
              </footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HowItWorks;
