import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { search } from "../../services/itemsService.js";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ErrorBox from "../../components/ErrorBox/ErrorBox.jsx";
import Card from "../../components/Card/Card.jsx";

import "./Items.css";
export default function Items() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError("");

    search(q)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  function handleSearch(e) {
    setParams({ q: e.target.value });
  }

  return (
    <div>
      <h1>Rick & Morty Characters</h1>

      <input value={q} onChange={handleSearch} placeholder="Search..." />

      {loading && <Spinner />}
      {error && <ErrorBox message={error} />}

      <ul>
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
