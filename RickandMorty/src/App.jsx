import {Routes, Route} from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import CharacterDetails from "./Pages/CharacterDetails";
import LocationDetails from "./Pages/LocationDetails";
import Characters from "./Pages/Characters";
import NotFound from "./Pages/NotFound";
import Locations from "./Pages/Locations";
import {AuthProvider} from "./Context/AuthContext";
import AuthPage from "./Pages/AuthPage";
import Episodes from "./Pages/Episodes";
import EpisodeDetails from "./Pages/EpisodeDetails";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/location/:id" element={<LocationDetails />} />
          <Route path="/episode/:id" element={<EpisodeDetails />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
