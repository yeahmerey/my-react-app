const api = "/api";

export async function load() {
  const res = await fetch(api);

  const data = await res.json();
  // console.log(data, "fetched data");
  return data;
  //   setGames(data);
}
