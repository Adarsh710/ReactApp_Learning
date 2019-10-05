import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./layout.css";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="nav-links">
        <Link className="auth" onClick={this.onLogoutClick.bind(this)} to=''>
          <img src={user.avatar} alt={user.name} style={{width: '30px', marginRight: '10px', borderRadius: '50%'}} title={user.name} />
          Logout
        </Link>
      </div>
    );

    const guestLinks = (
      <div className="nav-links">
        <Link className="auth" to="/register">
          Register
        </Link>

        <Link className="auth" to="/login">
          Login
        </Link>
      </div>
    );

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
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const maoStateToProps = state => ({
  auth: state.auth
});

export default connect(
  maoStateToProps,
  { logoutUser }
)(Navbar);
