const API = "https://rickandmortyapi.com/api/character";

export async function search(query) {
  const url = query ? `${API}/?name=${query}` : API;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Fail loading items");
  }

  const data = await res.json();
  return data.results || [];
}

export async function getById(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) {
    throw new Error("Item is not found");
  }
  return await res.json();
}
