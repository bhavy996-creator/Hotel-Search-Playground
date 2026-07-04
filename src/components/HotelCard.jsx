import { Link } from "react-router-dom";
import "./HotelCard.css";

export default function HotelCard({ hotel }) {
  return (
    <article className="hotel-card">
      <Link to={`/hotels/${hotel.id}`} className="hotel-card__photo-link">
        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          className="hotel-card__photo"
          loading="lazy"
        />
      </Link>

      <div className="hotel-card__body">
        <p className="hotel-card__location">{hotel.location}</p>

        <h3 className="hotel-card__name">
          <Link to={`/hotels/${hotel.id}`}>{hotel.name}</Link>
        </h3>

        <p className="hotel-card__description">{hotel.description}</p>

        <div className="hotel-card__footer">
          <span className="hotel-card__price">
            ₹{hotel.price.toLocaleString("en-IN")} / night
          </span>
          <span className="hotel-card__rating">⭐ {hotel.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}