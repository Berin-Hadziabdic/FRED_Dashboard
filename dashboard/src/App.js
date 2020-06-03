import React from "react";
import "./App.css";
import NavBar from "./Components/Nav/Nav";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
