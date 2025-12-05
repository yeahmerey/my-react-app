import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { getById } from "../../services/itemsService.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import "./ItemDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemById,
  clearSelectedItem,
} from "../../features/items/itemsSlice";
export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [item, setItem] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state) => state.items
  );

  // useEffect(() => {
  //   setLoading(true);
  //   getById(id)
  //     .then(setItem)
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, [id]);
  useEffect(() => {
    dispatch(fetchItemById(id));
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [id, dispatch]);
  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return <p>Not found</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{selectedItem.name}</h1>
      <img src={selectedItem.image} alt={selectedItem.name} />

      <p className="detail">Status: {selectedItem.status}</p>
      <p className="detail">Species: {selectedItem.species}</p>
      <p className="detail">Gender: {selectedItem.gender}</p>
      <p className="detail">Origin: {selectedItem.origin?.name}</p>
      <p className="detail">Location: {selectedItem.location?.name}</p>
      <p className="detail">Episodes: {selectedItem.episode.length}</p>
    </div>
  );
}
