import { useState } from "react";

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
    <>
      <p>Click button to Load Data :</p>

      <button onClick={load}>Load Games</button>
      <p>Count of games : {games?.length || "Empty data"}</p>
      <ul>
        {games.map((g) => (
          <li key={g.id}>{g.title}</li>
        ))}
      </ul>
    </>
  );
}
