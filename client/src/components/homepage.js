import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import "../assets/homepage.css";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.showStatics = this.showStatics.bind(this);

    this.state = {
      isValidated: true,
      GlobalData: [],
      CountrywiseData: [],
    };
  }

  showStatics() {
    // console.log("show statics logs.");
    let userdata = JSON.parse(localStorage.getItem("userdata"));
    // console.log("get local userdata", userdata);
    if (userdata) {
      axios
        .post("http://localhost:5000/validateToken", userdata)
        .then(async (res) => {
          // console.log("Validation Response", res.data);
          if (res.data.status === 200) {
            const url = "https://api.covid19api.com/summary";
            const response = await fetch(url);
            const data = await response.json();
            // console.log("corona data", data);
            this.setState({
              GlobalData: data.Global,
              CountrywiseData: data.Countries,
              isValidated: true,
            });
            // console.log(this.state.GlobalData);
          } else {
            this.setState({ isValidated: false });
          }
        });
    } else {
      this.setState({ isValidated: false });
    }
  }

  showGlobalTable() {
    return (
      <div className="show-card">
        <h1>World statics </h1>
        <h2>
          Current Active Cases :{" "}
          {this.state.GlobalData.TotalConfirmed -
            this.state.GlobalData.TotalDeaths -
            this.state.GlobalData.TotalRecovered}
        </h2>
        <h2>Total Confirmed Cases : {this.state.GlobalData.TotalConfirmed}</h2>
        <h2>Total deaths in World : {this.state.GlobalData.TotalDeaths}</h2>
      </div>
    );
  }

  showtable() {
    return (
      <div className="show-card">
        <h1>Countrywise data</h1>
        <hr />

        <table>
          <thead>
            <tr>
              <th>Country</th>

              <th>Active Cases</th>
              <th>Recovered Cases</th>
              <th>Total Deaths</th>
              <th>Total Cases</th>
            </tr>
          </thead>
          <tbody>
            {this.state.CountrywiseData.map((cdata) => (
              <tr key={cdata.CountryCode}>
                <td>{cdata.Country}</td>
                <td>
                  {cdata.TotalConfirmed -
                    cdata.TotalDeaths -
                    cdata.TotalRecovered}
                </td>
                <td>{cdata.TotalRecovered}</td>
                <td>{cdata.TotalDeaths}</td>
                <td>{cdata.TotalConfirmed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { isValidated } = this.state;

    if (!isValidated) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <div className="homepage">
          <h1>Welcome to corona statics view application</h1>
          <Link to="" onClick={this.showStatics}>
            <button>Get Statics</button>
          </Link>
          <p>
            * To Get statics you need to be <em>logged in </em>OR Sign Up if you
            don't have an account
          </p>
        </div>
        {this.showGlobalTable()}
        {this.showtable()}
      </>
    );
  }
}
