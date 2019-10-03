import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="login">
            <div className="heading">
                <h1>Login</h1>
            </div>
            <form className="form" action="">
                <input type="email" name="email" placeholder="Email Address" required />
                <input type="password" name="password1" placeholder="Password" required />
                <input type="submit" name="submit" />
            </form>
        </div>
    </div>
    );
  }
}

export default Login;
