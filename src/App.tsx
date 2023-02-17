import React from "react";
import { Route, Routes } from "react-router-dom";
import ExpansionDetails from "./components/ExpansionDetails";
import Home from "./components/Home";
import RemoveCard from "./components/RemoveCard";
import WishListDelete from "./components/WishListDelete";
import WishListDetails from "./components/WishListDetails";
import WishLists from "./components/WishLists";
import WishListSelect from "./components/WishListSelect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/expansions/details/:name"
          element={<ExpansionDetails />}
        />
        <Route path="/wish-lists" element={<WishLists />} />
        <Route path="/wish-lists/delete" element={<WishListDelete />} />
        <Route path="/wish-lists/add-card" element={<WishListSelect />} />
        <Route path="/wish-lists/details/:name" element={<WishListDetails />} />
        <Route path="/wish-lists/delete/card" element={<RemoveCard />} />
      </Routes>
    </>
  );
}

export default App;
