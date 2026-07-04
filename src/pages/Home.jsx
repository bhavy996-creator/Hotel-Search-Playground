import { useEffect, useState } from "react";
import { fetchAllHotels } from "../api/hotelApi";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchAllHotels()
      .then((data) => {
        setHotels(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  return (
    <div className="container">
      <h1>Home page</h1>
      <p>Status: {status}</p>
      <p>Hotels loaded: {hotels.length}</p>
    </div>
  );
}