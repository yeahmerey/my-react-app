import { useState } from "react";
import "./Games.css";
import Game from "../Game/Game.jsx";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  const api = "/api";

  function DeleteButton() {
    function handleDelete() {
      setFilterQuery("");
    }
    return <button onClick={handleDelete}>Delete</button>;
  }

  async function load() {
    const res = await fetch(api);

    const data = await res.json();
    // console.log(data, "fetched data");
    setGames(data);
  }

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(filterQuery.toLowerCase())
  );
  return (
    <div>
      <p>Click button to Load Data :</p>

      <button onClick={load}>Load Games</button>
      <p>Count of games : {games?.length || "Empty data"}</p>
      <p id="search">Searching : {filterQuery || "Empty"}</p>
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
