import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";

import AppContainer from "./AppContainer";

class RouterApp extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </Router>
    );
  }
}

export default RouterApp;
