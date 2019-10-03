import React, { Component } from "react";
import axios from "axios";
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

    axios
      .post('/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div className="container">
        <div className="signup">
          <div className="heading">
            <h1>Register</h1>
            <p>Create your account</p>
          </div>
          <form className="form" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.onChange}
            />
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.onChange}
            />
            <p>
              <small className="small">
                This site uses Gravatar so if you want a profile picture then
                use Gravatar Email
              </small>
            </p>
            <input
              type="password"
              name="password1"
              value={this.state.password1}
              placeholder="Password"
              onChange={this.onChange}
            />
            <input
              type="password"
              name="password2"
              value={this.state.password2}
              placeholder="Confirm Password"
              onChange={this.onChange}
            />
            <input type="submit" name="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
