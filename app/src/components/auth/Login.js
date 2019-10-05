import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="login">
          <div className="heading">
            <h1>Login</h1>
          </div>
          <form className="form" onSubmit={this.onSubmit} noValidate>
            <input
              className={classnames("form-input", {
                "is-invalid": errors.email
              })}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email Address"
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <input
              className={classnames("form-input", {
                "is-invalid": errors.password
              })}
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Password"
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <input className="form-input" type="submit" name="submit" />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
