import React from "react";
import { Navbar, Nav, Button, Figure } from "react-bootstrap";
import dino from "../images/dinosaur.png";
import "../css/Navigation.css";

const Navigation = () => {
  const doLogout = async (event) => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="navigation">
      <Navbar sticky="top">
        <Nav className="justify-content-center" style={{ width: "100%" }}>
          <Navbar.Brand id="dino" href="/">
            Giftzilla
            <Figure className="dinosaur">
              <Figure.Image
                width={30}
                height={30}
                alt="giftzilla dinosaur"
                src={dino}
              />
            </Figure>
          </Navbar.Brand>
          <Nav.Link className="navlink" href="/home">
            Home
          </Nav.Link>
          <Nav.Link className="navlink" href="/calendar">
            Calendar
          </Nav.Link>
          <Nav.Link className="navlink" href="/wishlist">
            Wishlist
          </Nav.Link>
          <Nav.Link className="navlink" href="/friends">
            Friends
          </Nav.Link>
          {/* <Nav.Link className="navlink" href="/checkout">
            Checkout
          </Nav.Link> */}
          {/* <Nav.Link className="navlink" href="/bestbuy">
            BestBuy
          </Nav.Link> */}
          <Nav.Link className="navlink" href="/settings">
            Settings
          </Nav.Link>
        </Nav>
        <Button
          className="justify-content-end "
          variant="success"
          size="sm"
          onClick={doLogout}
        >
          Logout
        </Button>
        &nbsp; &nbsp;
      </Navbar>
    </div>
  );
};

export default Navigation;
