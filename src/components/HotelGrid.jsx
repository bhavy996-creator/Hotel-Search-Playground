import HotelCard from "./HotelCard";
import "./HotelGrid.css";

export default function HotelGrid({ hotels }) {
  return (
    <div className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}