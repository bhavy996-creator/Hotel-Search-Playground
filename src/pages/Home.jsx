import { useState } from "react";
import { DEFAULT_FILTERS, useHotels } from "../hooks/useHotels";
import FilterPanel from "../components/FilterPanel";
import HotelGrid from "../components/HotelGrid";
import Pagination from "../components/Pagination";

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { hotels, totalResults, totalPages, locations, status } = useHotels(
    filters,
    page
  );

  const handleFiltersChange = (next) => {
    setFilters(next);
    setPage(1); // reset to first page whenever filters change
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <h1>Find your stay</h1>

      <FilterPanel
        filters={filters}
        onChange={handleFiltersChange}
        locations={locations}
      />

      <p>{totalResults} hotels found</p>

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