import React from "react";
import dino from "../images/Zilla.png";
import { Figure } from "react-bootstrap";

function Header() {
  return (
    <div className="container">
      <div className="header-text">
        <div className="header-lead-in">
          Welcome To Giftzilla
          <Figure className="dinosaur">
            <Figure.Image
              width={75}
              height={75}
              alt="giftzilla dinosaur"
              src={dino}
            />
          </Figure>
        </div>
        <div className="header-heading text-uppercase ">
          See your friends most wanted gifts for any occasion
        </div>
      </div>
    </div>
  );
}

export default Header;
