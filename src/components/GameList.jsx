// GameList.jsx
import React from 'react';
import GameItem from './GameItem';

const GameList = ({ games, showGameDetails, addToBasket }) => (
  <div className="img-container">
    {games.map((game) => (
      <GameItem key={game.id} game={game} showGameDetails={showGameDetails} addToBasket={addToBasket} />
    ))}
  </div>
);

export default GameList;
