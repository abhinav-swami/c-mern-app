import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import "../assets/navbar.css";

import Homepage from "./homepage.js";
import Login from "./login";
import Signup from "./signup";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.state = {
      redirect: false,
    };
  }

  logout() {
    let userdata = JSON.parse(localStorage.getItem("userdata"));
    localStorage.removeItem("userdata");
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <BrowserRouter>
        <div className="navbar">
          <Link to="/">Homepage</Link>
          <Link to="/login" className="rb">
            Login
          </Link>
          <Link to="/signup" className="rb">
            Signup
          </Link>
          <Link to="/" onClick={this.logout} className="rb">
            Logout
          </Link>
        </div>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
