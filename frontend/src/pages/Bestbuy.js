import React from "react";
import Bestbuy from "../components/Bestbuy";
import request from "../request";
import "../css/Bestbuy.css";
import Navigation from "../components/Navigation";

const BestBuy = () => {
  return (
    <div className="bestbuypage">
      <Navigation />

      <div className="bg_color">
        <h1 className="elementStyling"> Best Buy </h1>
        <Bestbuy title="Arcade Games" fetchUrl={request.searchFunction} />
        <Bestbuy title="Nintendo Games " fetchUrl={request.nintendoGames} />
        <Bestbuy title="Xbox Games" fetchUrl={request.xboxGames} />
        <Bestbuy
          title="Playstation Games"
          fetchUrl={request.playstationGames}
        />
      </div>
    </div>
  );
};

export default BestBuy;
