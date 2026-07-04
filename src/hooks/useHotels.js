import { useEffect, useMemo, useState } from "react";
import { fetchAllHotels } from "../api/hotelApi";

export const DEFAULT_FILTERS = {
  search: "",
  location: "all",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  sortBy: "recommended",
};

const PAGE_SIZE = 12;

function sortHotels(hotels, sortBy) {
  // Always copy before sorting — sort() mutates the array in place,
  // and mutating state directly in React causes subtle bugs.
  const sorted = [...hotels];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function useHotels(filters, page) {
  const [allHotels, setAllHotels] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  // Fetch once on mount — filters/page changing does NOT refetch,
  // it just re-filters what's already in memory.
  useEffect(() => {
    fetchAllHotels()
      .then((hotels) => {
        setAllHotels(hotels);
        setStatus("success");
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, []);

  // Every unique city, for the filter dropdown
  const locations = useMemo(() => {
    const unique = new Set(allHotels.map((hotel) => hotel.location));
    return Array.from(unique).sort();
  }, [allHotels]);

  // Recompute filtered+sorted list whenever hotels or filters change
  const filtered = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    const min = filters.minPrice === "" ? null : Number(filters.minPrice);
    const max = filters.maxPrice === "" ? null : Number(filters.maxPrice);
    const minRating =
      filters.minRating === "" ? null : Number(filters.minRating);

    const result = allHotels.filter((hotel) => {
      if (term) {
        const haystack = `${hotel.name} ${hotel.location}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (filters.location !== "all" && hotel.location !== filters.location) {
        return false;
      }
      if (min !== null && hotel.price < min) return false;
      if (max !== null && hotel.price > max) return false;
      if (minRating !== null && hotel.rating < minRating) return false;
      return true;
    });

    return sortHotels(result, filters.sortBy);
  }, [allHotels, filters]);

  // Slice out just the current page
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return {
    hotels: paged,
    totalResults: filtered.length,
    totalPages,
    page: safePage,
    locations,
    status,
    error,
  };
}