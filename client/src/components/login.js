import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "../assets/login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPwd = this.onChangeUserPwd.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_email: "",
      user_pwd: "",
      redirect: false,
    };
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
    // console.log("user added");

    const userpost = {
      user_email: this.state.user_email,
      user_pwd: this.state.user_pwd,
    };
    // console.log(userpost);

    axios.post("http://localhost:5000/login", userpost).then((res) => {
      // console.log("Login Response", res.data);
      if (res.data.status === 200) {
        res.data.data.token = res.data.token;
        localStorage.setItem("userdata", JSON.stringify(res.data.data));
        this.setState({
          redirect: true,
        });
      } else {
        alert(res.data.message);
      }
    });

    this.setState({
      user_email: "",
      user_pwd: "",
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="loginform">
        <h1>Log in</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Email :{" "}
            <input
              type="email"
              value={this.state.user_email}
              onChange={this.onChangeUserEmail}
              placeholder="enter registered email"
              id="useremail"
              required
            ></input>
          </label>
          <br />

          <label>
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

          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}
