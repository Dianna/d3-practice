import React, { Component } from "react";

import "./App.css";

import { HashRouter } from "react-router-dom";

import Routes from "./Routes";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navigation />
          <Routes />
        </div>
      </HashRouter>
    );
  }
}

export default App;
