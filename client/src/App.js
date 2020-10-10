import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
