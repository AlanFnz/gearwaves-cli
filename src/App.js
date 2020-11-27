import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
// Style
import "bootstrap/dist/css/bootstrap.min.css";
// Components
import Nav from "./components/layout/Nav";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <h1>Content</h1>
      </Router>
    </div>
  );
}

export default App;
