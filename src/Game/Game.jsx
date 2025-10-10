import "./Game.css";
export default function Game({ gameTitle, gamePhotoUrl }) {
  return (
    <div id="game-list">
      <h1>{gameTitle}</h1>
      <img src={gamePhotoUrl} alt="game photo" />
    </div>
  );
}
