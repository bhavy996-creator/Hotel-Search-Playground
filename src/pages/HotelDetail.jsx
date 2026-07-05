import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchHotelById } from "../api/hotelApi";
import "./HotelDetail.css";

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setActivePhoto(0);

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

    // Cleanup: if the user navigates away before the fetch finishes,
    // don't call setState on an unmounted component.
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <p>Loading hotel…</p>
      </div>
    );
  }

  if (status === "error" || !hotel) {
    return (
      <div className="container">
        <p>Couldn't load this hotel. {error?.message}</p>
        <Link to="/">← Back to all hotels</Link>
      </div>
    );
  }

  // Some hotels may only have a thumbnail and no separate photos array
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
                  className={
                    index === activePhoto ? "is-active" : ""
                  }
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

          <button
            type="button"
            className="detail__book"
            onClick={() =>
              window.alert(`${hotel.name} reserved (demo only).`)
            }
          >
            Reserve this room
          </button>
        </div>
      </div>
    </div>
  );
}