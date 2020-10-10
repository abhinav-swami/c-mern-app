import React, { Component } from "react";
import axios from "axios";

import "../assets/signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPwd = this.onChangeUserPwd.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_name: "",
      user_email: "",
      user_pwd: "",
    };
  }
  onChangeUserName(e) {
    this.setState({
      user_name: e.target.value,
    });
  }
  onChangeUserEmail(e) {
    this.setState({
      user_email: e.target.value,
    });
  }
  onChangeUserPwd(e) {
    this.setState({
      user_pwd: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("user added");

    const newUser = {
      user_name: this.state.user_name,
      user_email: this.state.user_email,
      user_pwd: this.state.user_pwd,
    };

    axios
      .post("http://localhost:5000/signup", newUser)
      .then((res) => alert("signed up successfully login now"));

    this.setState({
      user_name: "",
      user_email: "",
      user_pwd: "",
    });
  }
  render() {
    return (
      <div className="signupform">
        <h1>Sign up</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="user_name">
            Name : {"     "}
            <input
              type="text"
              value={this.state.user_name}
              onChange={this.onChangeUserName}
              id="username"
              required
            ></input>
          </label>
          <br />
          <label htmlFor="user_email">
            Email :{" "}
            <input
              type="email"
              value={this.state.user_email}
              onChange={this.onChangeUserEmail}
              id="useremail"
              required
            ></input>
          </label>
          <br />

          <label htmlFor="user_pwd">
            Password :{" "}
            <input
              type="password"
              value={this.state.user_pwd}
              onChange={this.onChangeUserPwd}
              id="userpwd"
              required
            ></input>
          </label>
          <br />

          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}
