import { useState } from "react";
import { DEFAULT_FILTERS, useHotels } from "../hooks/useHotels";

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { hotels, totalResults, totalPages, locations, status, error } =
    useHotels(filters, page);

  return (
    <div className="container">
      <h1>Home page</h1>
      <p>Status: {status}</p>
      <p>Total results: {totalResults}</p>
      <p>Total pages: {totalPages}</p>
      <p>Cities available: {locations.join(", ")}</p>

      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            {hotel.name} — {hotel.location} — ₹{hotel.price} — ⭐{hotel.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}