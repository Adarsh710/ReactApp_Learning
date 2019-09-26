import React, { Component } from "react";
import "./layout.css";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="hero heroimage">
          <img
            className="img1"
            src={require("../../img/placeholder.jpg")}
            alt="Placeholder"
          />
        </div>
      </div>
    );
  }
}

export default Landing;
