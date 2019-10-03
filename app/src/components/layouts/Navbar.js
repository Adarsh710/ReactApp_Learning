import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./layout.css";

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link className="brand" to="/">
              Brand-Name
            </Link>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <Link className="auth" to="/register">
            Register
          </Link>
          <Link className="auth" to="/login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
