import { DEFAULT_FILTERS } from "../hooks/useHotels";
import "./FilterPanel.css";

export default function FilterPanel({ filters, onChange, locations }) {
  // Small helper: merge a partial change into the existing filters object,
  // rather than repeating {...filters, ...} everywhere below.
  const update = (patch) => onChange({ ...filters, ...patch });

  const hasActiveFilters =
    filters.search !== "" ||
    filters.location !== "all" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.minRating !== "";

  return (
    <section className="filter-panel" aria-label="Search and filter hotels">
      <input
        type="search"
        placeholder="Search by hotel name or city…"
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
        className="filter-panel__search"
      />

      <div className="filter-panel__grid">
        <label className="filter-field">
          <span>City</span>
          <select
            value={filters.location}
            onChange={(e) => update({ location: e.target.value })}
          >
            <option value="all">All cities</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Min price (₹)</span>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
          />
        </label>

        <label className="filter-field">
          <span>Max price (₹)</span>
          <input
            type="number"
            min="0"
            placeholder="Any"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
          />
        </label>

        <label className="filter-field">
          <span>Min rating</span>
          <select
            value={filters.minRating}
            onChange={(e) => update({ minRating: e.target.value })}
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5 and up</option>
            <option value="4">4 and up</option>
            <option value="3">3 and up</option>
          </select>
        </label>

        <label className="filter-field">
          <span>Sort by</span>
          <select
            value={filters.sortBy}
            onChange={(e) => update({ sortBy: e.target.value })}
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating-desc">Rating: high to low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-panel__reset"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}