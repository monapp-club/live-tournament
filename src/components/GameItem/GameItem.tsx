import { Game } from "../../types";
import "./GameItem.css";

interface GameItemProps {
  game: Game;
}

const GameItem = ({ game }: GameItemProps) => {
  return (
    <div className="game-item">
      <p>{game.homeTeam.name}</p>
    </div>
  );
};

export default GameItem;
