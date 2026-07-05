import { useState } from "react";
import { DEFAULT_FILTERS, useHotels } from "../hooks/useHotels";
import HotelGrid from "../components/HotelGrid";
import Pagination from "../components/Pagination";

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { hotels, totalResults, totalPages, status } = useHotels(
    filters,
    page
  );

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <h1>Home page</h1>
      <p>Total results: {totalResults}</p>

      {status === "loading" && <p>Loading hotels…</p>}

      {status === "success" && (
        <>
          <HotelGrid hotels={hotels} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}