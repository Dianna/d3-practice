import React, { Component } from "react";

import "./App.css";

import { HashRouter } from "react-router-dom";

import Navigation from "./components/Navigation";
import Routes from "./components/Routes";

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
