import React, { useState } from "react";
import "./mainPage.css";
import Game, {
  actionGames,
  adventureGames,
  shooterGames,
  rpgGames,
} from "../model/gamesData";

export default function ShowGames() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [basketData, setBasketData] = useState([]);

  class Basket extends Game {
    constructor(title, price, img) {
      super(
        title,
        "Default description",
        price,
        "Default platform",
        "Default developer",
        img
      );
    }
  }

  const ShowBasket = ({ title, price, img }) => {
    const [basket, setBasket] = useState(new Basket(title, price, img));

    return (
      <div>
        <h2>Basket Details</h2>
        <p>Title: {basket.title}</p>
        <p>Price: {basket.price}</p>
        <img className="img-size" src={basket.img} alt="none" />
      </div>
    );
  };

  const addToBasket = () => {
    let newItem = new Basket("Test", 20, "img"); // Change these values as needed

    setBasketData((prevBasketData) => [...prevBasketData, newItem]);
  };

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

      {basketData.map((basket, index) => (
        <ShowBasket
          key={index}
          title={basket.title}
          price={basket.price}
          img={basket.img}
        />
      ))}

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}
