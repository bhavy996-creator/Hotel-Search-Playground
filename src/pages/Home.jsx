import { useState } from "react";
import { DEFAULT_FILTERS, useHotels } from "../hooks/useHotels";
import HotelCard from "../components/HotelCard";

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { hotels, totalResults, status } = useHotels(filters, page);

  return (
    <div className="container">
      <h1>Home page</h1>
      <p>Total results: {totalResults}</p>

      {status === "loading" && <p>Loading hotels…</p>}

      {status === "success" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}