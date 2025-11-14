import { useState, useEffect } from "react";
import "./Games.css";
import Game from "../Game/Game.jsx";
import useDebounce from "../../useDebounce.jsx";
import { load } from "../../services/itemsService.js";
import Spinner from "../Spinner/Spinner.jsx";
import ErrorBox from "../ErrorBox/ErrorBox.jsx";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [clicked, setClicked] = useState(false);
  const debounce2 = useDebounce(filterQuery, 1500);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const api = "/api";

  useEffect(() => {
    if (!clicked) return; //not automatically loading fetching data , we need do correctly logic of button/

    setLoading(true);
    setError("");

    load()
      .then((data) => setGames(data))
      .catch((err) => setError(err.message || "Something went wrong..."))
      .finally(() => {
        setLoading(false);
      });
  }, [clicked]); //one time rendering []...
  // async function load() {
  //   const res = await fetch(api);

  //   const data = await res.json();
  //   // console.log(data, "fetched data");
  //   setGames(data);
  // }

  function DeleteButton() {
    function handleDelete() {
      setFilterQuery("");
    }
    return <button onClick={handleDelete}>Delete</button>;
  }

  // const filteredGames = games.filter((game) =>
  //   game.title.toLowerCase().includes(filterQuery.toLowerCase())
  // );
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(debounce.toLowerCase())
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounce(filterQuery);
    }, 1000);
    return () => clearTimeout(id);
  }, [filterQuery]);

  return (
    <div>
      <p>Click button to Load Data :</p>

      <button onClick={() => setClicked(true)}>Load Games</button>

      {loading && <Spinner />}
      {error && <ErrorBox message={error} />}

      <p>Count of games : {games?.length || "Empty data"}</p>
      <p id="search">Searching : {filterQuery || "Empty"}</p>
      <p id="search">Debounce : {debounce || "Empty"}</p>
      <p id="search">Custom hook : {debounce2 || "Empty"}</p>

      <input
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
      ></input>

      <div className="delete">
        <DeleteButton />
      </div>

      <ul>
        {filteredGames.map((game) => (
          //   <li key={game.id}>{game.title}</li>
          <Game
            key={game.id}
            gameTitle={game.title}
            gamePhotoUrl={game.thumbnail}
          />
        ))}
      </ul>
    </div>
  );
}
