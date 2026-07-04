import { useParams } from "react-router-dom";

export default function HotelDetail() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>Hotel detail page</h1>
      <p>Showing details for hotel id: {id}</p>
    </div>
  );
}