import { useState } from "react";
import { DEFAULT_FILTERS, useHotels } from "../hooks/useHotels";
import FilterPanel from "../components/FilterPanel";
import HotelGrid from "../components/HotelGrid";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { hotels, totalResults, totalPages, locations, status, error } =
    useHotels(filters, page);

  const handleFiltersChange = (next) => {
    setFilters(next);
    setPage(1);
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

      {status === "loading" && <Loader label="Loading hotels…" />}

      {status === "error" && (
        <EmptyState
          title="Something went wrong"
          message={error?.message || "Couldn't load hotels right now."}
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      )}

      {status === "success" && totalResults === 0 && (
        <EmptyState
          title="No stays match those filters"
          message="Try widening your price range or clearing a filter."
          actionLabel="Clear filters"
          onAction={() => handleFiltersChange(DEFAULT_FILTERS)}
        />
      )}

      {status === "success" && totalResults > 0 && (
        <>
          <p>{totalResults} hotels found</p>
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