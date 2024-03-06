import React, { useState } from "react";
import "./mainPage.css";
import Game, { actionGames, adventureGames, shooterGames, rpgGames } from "../model/gamesData";

export default function ShowGames() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [basketData, setBasketData] = useState([]);

  class Basket extends Game {
    constructor(title, price, img) {
      super(title, "Default description", price, "Default platform", "Default developer", img);
    }
  }

  const ShowBasket = ({ title, price, img }) => (
    <div>
      <h2>Basket Details</h2>
      <p>Title: {title}</p>
      <p>Price: {price}</p>
      <img className="img-size" src={img} alt="none" onClick={() => showGameDetails({ title, price, img })} />
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
    </div>
  );

  const addToBasket = (title, price, img) => {
    let newItem = new Basket(title, price, img);
    setBasketData((prevBasketData) => [...prevBasketData, newItem]);
  };

  const ShowAddToBasket = ({ title, price, img }) => (
    <div>
      <button onClick={() => addToBasket(title, price, img)}>Add to Basket</button>
    </div>
  );

  const GameList = ({ games }) => (
    <div className="img-container">
      {games.map((game, index) => (
        <div key={index}>
          <img className="img-size" src={game.img} alt="none" onClick={() => showGameDetails(game)} />
          <h3 className="game-title">{game.title}</h3>
          <ShowAddToBasket title={game.title} price={game.price} img={game.img} />
        </div>
      ))}
    </div>
  );

  const ActionGamesList = () => (
    <>
      <h2>Action Games</h2>
      <GameList games={actionGames} />
    </>
  );

  const ShooterGamesList = () => (
    <>
      <h2>Shooter Games</h2>
      <GameList games={shooterGames} />
    </>
  );

  const AdventureGamesList = () => (
    <>
      <h2>Adventure Games</h2>
      <GameList games={adventureGames} />
    </>
  );

  const RpgGamesList = () => (
    <>
      <h2>Role Playing Games</h2>
      <GameList games={rpgGames} />
    </>
  );

  const showGameDetails = (game) => {
    setSelectedGame(game);
  };

  const resetSelectedGame = () => {
    setSelectedGame(null);
  };

  const GameDetails = ({ game }) => (
    <div>
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <button className="back-button" onClick={resetSelectedGame}>
        Back
      </button>
    </div>
  );

  return (
    <div>
      {selectedGame ? (
        <GameDetails game={selectedGame} />
      ) : (
        <>
          <ActionGamesList />
          <ShooterGamesList />
          <AdventureGamesList />
          <RpgGamesList />
        </>
      )}

      {basketData.map((basket, index) => (
        <ShowBasket key={index} title={basket.title} price={basket.price} img={basket.img} />
      ))}
    </div>
  );
}
