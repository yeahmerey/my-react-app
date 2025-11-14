import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById } from "../../services/itemsService.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import "./ItemDetails.css";
export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getById(id)
      .then(setItem)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!item) return <p>Not found</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} />

      <p className="detail">Status: {item.status}</p>
      <p className="detail">Species: {item.species}</p>
      <p className="detail">Gender: {item.gender}</p>
      <p className="detail">Origin: {item.origin?.name}</p>
      <p className="detail">Location: {item.location?.name}</p>
      <p className="detail">Episodes: {item.episode.length}</p>
    </div>
  );
}
