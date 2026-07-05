import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllHotels } from "../api/hotelApi";
import { useFavorites } from "../context/FavoritesContext";
import HotelGrid from "../components/HotelGrid";

export default function Favorites() {
  const navigate = useNavigate();
  const { favoriteIds } = useFavorites();
  const [allHotels, setAllHotels] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchAllHotels()
      .then((hotels) => {
        setAllHotels(hotels);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  const saved = allHotels.filter((hotel) => favoriteIds.includes(hotel.id));

  return (
    <div className="container" style={{ padding: "24px" }}>
      <h1>Saved stays</h1>

      {status === "loading" && <p>Loading…</p>}

      {status === "success" && saved.length === 0 && (
        <div>
          <p>Nothing saved yet. Tap the heart on any hotel to save it.</p>
          <button type="button" onClick={() => navigate("/")}>
            Browse hotels
          </button>
        </div>
      )}

      {status === "success" && saved.length > 0 && <HotelGrid hotels={saved} />}
    </div>
  );
}