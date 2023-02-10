import React from "react";
import { Route, Routes } from "react-router-dom";
import ExpansionDetails from "./components/ExpansionDetails";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/expansions/details/:name"
          element={<ExpansionDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
