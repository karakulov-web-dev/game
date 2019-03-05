import React, { Component } from "react";
import ThreeContainer from "./containers/ThreeContainer";
import InterfaceOverlayContainer from "./containers/InterfaceOverlayContainer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <InterfaceOverlayContainer />
        <ThreeContainer />
      </div>
    );
  }
}

export default App;
