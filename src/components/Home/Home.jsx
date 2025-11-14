import { Link } from "react-router";
import Games from "../Games/Games.jsx";
export default function Home() {
  return (
    <div>
      <Link to={"/about"}>About</Link>
      <h1>Hello to Home Page of my project.</h1>
      <img
        src="https://cdn.7days.ru/pic/c8d/1001173/1572272/86.jpg"
        alt="image of Leo"
      />

      <Games />
    </div>
  );
}
