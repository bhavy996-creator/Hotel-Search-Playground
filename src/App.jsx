import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}