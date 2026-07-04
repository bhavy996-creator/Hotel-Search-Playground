const BASE_URL = "https://demohotelsapi.pythonanywhere.com";

// Simple in-memory cache — filled in once, reused after that.
let cachedHotels = null;

export async function fetchAllHotels() {
  // If we already fetched once, don't hit the network again.
  if (cachedHotels) {
    return cachedHotels;
  }

  const response = await fetch(`${BASE_URL}/hotels/`);

  if (!response.ok) {
    throw new Error(`Hotel API responded with status ${response.status}`);
  }

  const payload = await response.json();

  // The API wraps the actual array inside payload.data
  if (!payload || !Array.isArray(payload.data)) {
    throw new Error("Unexpected response shape from hotel API");
  }

  // Price comes back as a string from the API — convert once here
  // so every part of the app can safely treat it as a number.
  cachedHotels = payload.data.map((hotel) => ({
    ...hotel,
    price: Number(hotel.price),
  }));

  return cachedHotels;
}

export async function fetchHotelById(id) {
  const all = await fetchAllHotels();
  const hotel = all.find((h) => String(h.id) === String(id));

  if (!hotel) {
    throw new Error(`Hotel with id ${id} not found`);
  }

  return hotel;
}