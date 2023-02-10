import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expansions/details/:name" element={null} />
      </Routes>
    </>
  );
}

export default App;
