import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { search } from "../../services/itemsService.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import Card from "../../components/Card/Card.jsx";
import { fetchItems } from "../../features/items/itemsSlice.js";
import "./Items.css";

export default function Items() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";

  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [items, setItems] = useState([]);

  const { list, loadingList, errorList } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems(q));
  }, [q, dispatch]);

  // useEffect(() => {
  //   setLoading(true);
  //   setError("");

  //   search(q)
  //     .then(setItems)
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // }, [q]);

  function handleSearch(e) {
    setParams({ q: e.target.value });
  }

  return (
    <div>
      <h1>Rick & Morty Characters</h1>

      <input value={q} onChange={handleSearch} placeholder="Search..." />

      {loadingList && <Spinner />}
      {errorList && <ErrorBox message={errorList} />}

      <ul>
        {list.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
      {!loadingList && !errorList && list.length === 0 && (
        <p>No characters found</p>
      )}
    </div>
  );
}
