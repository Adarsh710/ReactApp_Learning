import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./Auth.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      console.log(this.props.auth.isAuthenticated);

      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password1,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="signup">
          <div className="heading">
            <h1>Register</h1>
            <p>Create your account</p>
          </div>
          <form className="form" onSubmit={this.onSubmit} noValidate>
            <input
              className={classnames("form-input", {
                "is-invalid": errors.name
              })}
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <input
              className={classnames("form-input", {
                "is-invalid": errors.email
              })}
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <p>
              <small className="small">
                This site uses Gravatar so if you want a profile picture then
                use Gravatar Email
              </small>
            </p>
            <input
              className={classnames("form-input", {
                "is-invalid": errors.password
              })}
              type="password"
              name="password1"
              value={this.state.password1}
              placeholder="Password"
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <input
              className={classnames("form-input", {
                "is-invalid": errors.password2
              })}
              type="password"
              name="password2"
              value={this.state.password2}
              placeholder="Confirm Password"
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <input className="form-input" type="submit" name="submit" />
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
