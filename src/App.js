import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import PrintStickersLandingPage from "./PrintStickerLandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PrintStickersLandingPage />}></Route>
          <Route path="/printer" element={<PrintStickersLandingPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
