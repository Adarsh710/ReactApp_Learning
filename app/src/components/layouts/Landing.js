import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./layout.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      console.log(this.props.auth.isAuthenticated);

      this.props.history.push("/dashboard");
    }
  }

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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
