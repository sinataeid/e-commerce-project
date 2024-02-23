// Give the component access to its CSS
import React from "react";
import "./mainPage.css";
import Game, {
  actionGames,
  adventureGames,
  shooterGames,
  rpgGames,
} from "../model/gamesData";
import { useState } from "react";

// Functional component - must be capitalized
export default function ShowGames() {
  const [selectedGame, setSelectedGame] = useState(null);

  

  const showGameDetails = (title) => {
    setSelectedGame(title);
  };

  const resetSelectedGame = () => {
    setSelectedGame(null);
  };

  const ActionGamesList = ({ games }) => (
    <div className="img-container">
      {games.map((game, index) => (
        <div onClick={() => showGameDetails(game)} key={index}>
          <img className="img-size" src={game.img} alt="none" />
        </div>
      ))}
    </div>
  );

  const ShooterGamesList = ({ games }) => (
    <div className="img-container">
      {games.map((game, index) => (
        <div onClick={() => showGameDetails(game)} key={index}>
          <h3>{game.title}</h3>
          <img className="img-size" src={game.img} alt="none" />
        </div>
      ))}
    </div>
  );

  const AdventureGamesList = ({ games }) => (
    <div className="img-container">
      {games.map((game, index) => (
        <div onClick={() => showGameDetails(game)} key={index}>
          <img className="img-size" src={game.img} alt="none" />
          <h3 className="game-title">{game.title}</h3>
        </div>
      ))}
    </div>
  );

  const RpgGamesList = ({ games }) => (
    <div className="img-container">
      {games.map((game, index) => (
        <div onClick={() => showGameDetails(game)} key={index}>
          <img className="img-size" src={game.img} alt="none" />
          <h3 className="game-title">{game.title}</h3>
        </div>
      ))}
    </div>
  );

  const GameDetails = ({ game }) => (
    <div>
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <button className="back-button" onClick={resetSelectedGame}>Back</button>
    </div>
  );

  // HTML goes in the return.
  return (
    <div>
      {selectedGame ? (
        <GameDetails game={selectedGame} />
      ) : (
        <>
          <h2>Action Games</h2>
          <ActionGamesList games={actionGames} />
          <h2>Shooter Games</h2>
          <ShooterGamesList games={shooterGames} />
          <h2>Adventure Games</h2>
          <AdventureGamesList games={adventureGames} />
          <h2>Role Playing Games</h2>
          <RpgGamesList games={rpgGames} />
          
        </>
      )}
    </div>
  );
}
