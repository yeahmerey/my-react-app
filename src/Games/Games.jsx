import { useState } from "react";
import "./Games.css";
import Game from "../Game/Game.jsx";
export default function Games() {
  const [games, setGames] = useState([]);

  const api = "/api";

  async function load() {
    const res = await fetch(api);

    const data = await res.json();
    console.log(data, "fetched data");
    setGames(data);
  }
  return (
    <div>
      <p>Click button to Load Data :</p>

      <button onClick={load}>Load Games</button>
      <p>Count of games : {games?.length || "Empty data"}</p>
      <ul>
        {games.map((game) => (
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
