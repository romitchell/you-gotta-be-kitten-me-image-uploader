import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import About from "./About";

import "./App.css";
import PrintStickersLandingPage from "./PrintStickerLandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PrintStickersLandingPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
