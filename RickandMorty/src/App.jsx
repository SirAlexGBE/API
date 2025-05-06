import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import CharacterDetails from "./Pages/CharacterDetails";
import Characters from "./Pages/Characters";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </>
  );
}
