import React, { Component } from "react";

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  }

  render() {
    return (
      <div className="container">
        <div className="login">
          <div className="heading">
            <h1>Login</h1>
          </div>
          <form className="form" onSubmit={this.onSubmit}>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Password"
              required
            />
            <input type="submit" name="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
