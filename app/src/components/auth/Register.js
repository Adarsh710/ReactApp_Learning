import React, { Component } from "react";
import './Auth.css'

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="signup">
            <div className="heading">
                <h1>Register</h1>
                <p>Create your account</p>
            </div>
            <form className="form" action="">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email Address" required />
                <p>
                    <small className="small">This site uses Gravatar so if you want a profile picture then use Gravatar
                        Email</small>
                </p>
                <input type="password" name="password1" placeholder="Password" required />
                <input type="password" name="password2" placeholder="Confirm Password" required />
                <input type="submit" name="submit" />
            </form>
        </div>
    </div>
    );
  }
}

export default Register;
