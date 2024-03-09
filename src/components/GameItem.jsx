import React from 'react';
import AddToBasketButton from './AddToBasketButton';

const GameItem = ({ game, showGameDetails, addToBasket }) => (
  <div key={game.id}>
    <img className="img-size" src={game.img} alt="none" onClick={() => showGameDetails(game)} />
    <h3 className="game-title">{game.title}</h3>
    <AddToBasketButton onClick={() => addToBasket(game)} />
  </div>
);

export default GameItem;
