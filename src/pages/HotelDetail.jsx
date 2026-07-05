import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchHotelById } from "../api/hotelApi";
import { useFavorites } from "../context/FavoritesContext";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import "./HotelDetail.css";

export default function HotelDetail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [hotel, setHotel] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setActivePhoto(0);
    setReserved(false);

    fetchHotelById(id)
      .then((data) => {
        if (cancelled) return;
        setHotel(data);
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <Loader label="Loading hotel…" />
      </div>
    );
  }

  if (status === "error" || !hotel) {
    return (
      <div className="container">
        <EmptyState
          title="Couldn't load this hotel"
          message={error?.message || "This hotel may no longer exist."}
          actionLabel="Back to all stays"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  const saved = isFavorite(hotel.id);
  const photos = hotel.photos?.length ? hotel.photos : [hotel.thumbnail];

  return (
    <div className="container detail">
      <Link to="/" className="detail__back">
        ← Back to all stays
      </Link>

      <div className="detail__layout">
        <div className="detail__gallery">
          <img
            src={photos[activePhoto]}
            alt={hotel.name}
            className="detail__main-photo"
          />

          {photos.length > 1 && (
            <div className="detail__thumbs">
              {photos.map((photo, index) => (
                <button
                  key={photo + index}
                  type="button"
                  className={index === activePhoto ? "is-active" : ""}
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                >
                  <img src={photo} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail__info">
          <p className="detail__location">{hotel.location}, India</p>
          <h1>{hotel.name}</h1>
          <p className="detail__description">{hotel.description}</p>

          <dl className="detail__meta">
            <div>
              <dt>Price</dt>
              <dd>₹{hotel.price.toLocaleString("en-IN")} / night</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{hotel.rating.toFixed(1)} / 5.0</dd>
            </div>
          </dl>

          <div className="detail__actions">
            <button
              type="button"
              className={`detail__save ${saved ? "is-saved" : ""}`}
              onClick={() => toggleFavorite(hotel.id)}
              aria-pressed={saved}
            >
              {saved ? "♥ Saved" : "♡ Save this stay"}
            </button>

            <button
              type="button"
              className="detail__book"
              onClick={() => setReserved(true)}
            >
              Reserve this room
            </button>
          </div>

          {reserved && (
            <p className="detail__confirmation">
              ✓ {hotel.name} reserved (demo only — no real booking is made).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}