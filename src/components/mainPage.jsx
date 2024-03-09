// Import statements...

import React, { useState, createContext, useContext, useReducer } from "react";
import "./mainPage.css";
import Game, { actionGames, adventureGames, shooterGames, rpgGames } from "../model/gamesData";
import BasketDetails from "./BasketDetails";

const DEFAULT_DESCRIPTION = "Default description";
const DEFAULT_PLATFORM = "Default platform";

const CATEGORY_TITLES = {
  action: "Action Games",
  shooter: "Shooter Games",
  adventure: "Adventure Games",
  rpg: "Role Playing Games",
};

// Context and reducer for basket state
const BasketContext = createContext();

const basketReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      const basketItemIndex = state.findIndex(item => item.title === action.payload.title);
      const updatedBasket = [...state];

      if (basketItemIndex !== -1) {
        updatedBasket[basketItemIndex].quantity += 1;
      } else {
        updatedBasket.push(action.payload);
      }

      return updatedBasket;

    case 'REMOVE_FROM_BASKET':
      return state
        .map(item => {
          if (item.title === action.payload.title) {
            item.quantity -= 1;
          }
          return item;
        })
        .filter(item => item.quantity > 0);

    default:
      return state;
  }
};

export const BasketProvider = ({ children }) => {
  const [basketData, dispatch] = useReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={{ basketData, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

export default function ShowGames() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { basketData, dispatch } = useBasket();

  class Basket extends Game {
    constructor(title, price, img, quantity) {
      super(title, DEFAULT_DESCRIPTION, price, DEFAULT_PLATFORM, "Default developer", img);
      this.quantity = quantity || 1;
    }
  }

  const ShowBasket = ({ title, price, img, quantity }) => (
    <section className="basket-item">
      <h2>Basket Details</h2>
      <p>Title: {title}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Quantity: {quantity}</p>
      <img
        className="img-size"
        src={img}
        alt={title}
        onClick={() => showGameDetails({ title, price, img })}
      />
      <button
        className="remove-button"
        onClick={() => removeFromBasket(title)}
      >
        Remove from Basket
      </button>
    </section>
  );

  const ShowAddToBasket = ({ title, price, img }) => (
    <button
      className="add-to-basket-button"
      onClick={() => addToBasket(title, price, img)}
    >
      Add to Basket
    </button>
  );

  const GameList = ({ games }) => (
    <div className="img-container">
      {games.map((game, index) => (
        <div className="game-item" key={index}>
          <img
            className="img-size"
            src={game.img}
            alt={game.title}
            onClick={() => showGameDetails(game)}
          />
          <h3 className="game-title">{game.title}</h3>
          <ShowAddToBasket title={game.title} price={game.price} img={game.img} />
        </div>
      ))}
    </div>
  );

  const GamesCategoryList = ({ category, games }) => (
    <div>
      <h2>{CATEGORY_TITLES[category]}</h2>
      <GameList games={games} />
    </div>
  );

  const ActionGamesList = () => (
    <GamesCategoryList category="action" games={actionGames} />
  );

  const ShooterGamesList = () => (
    <GamesCategoryList category="shooter" games={shooterGames} />
  );

  const AdventureGamesList = () => (
    <GamesCategoryList category="adventure" games={adventureGames} />
  );

  const RpgGamesList = () => (
    <GamesCategoryList category="rpg" games={rpgGames} />
  );

  const showGameDetails = game => {
    setSelectedGame(game);
  };

  const resetSelectedGame = () => {
    setSelectedGame(null);
  };

  const addToBasket = (title, price, img) => {
    const existingItem = basketData.find(item => item.title === title);

    if (existingItem) {
      dispatch({
        type: 'ADD_TO_BASKET',
        payload: { ...existingItem, quantity: existingItem.quantity + 1 },
      });
    } else {
      dispatch({ type: 'ADD_TO_BASKET', payload: new Basket(title, price, img, 1) });
    }
  };

  const removeFromBasket = title => {
    dispatch({ type: 'REMOVE_FROM_BASKET', payload: { title } });
  };

  const calculateTotalPrice = () => {
    const total = basketData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  const BasketSummary = () => (
    <div className="basket-summary">
      <h2>Basket Summary</h2>
      <p>Total Price: ${calculateTotalPrice()}</p>
    </div>
  );

  return (
    <div className="main-container">
      <div className="game-list-container">
        {selectedGame ? (
          <div>
            <ShowBasket {...selectedGame} />
            <button className="back-button" onClick={resetSelectedGame}>
              <span>Back to Games</span>
            </button>
          </div>
        ) : (
          <>
            <ActionGamesList />
            <ShooterGamesList />
            <AdventureGamesList />
            <RpgGamesList />
          </>
        )}
      </div>

      <div className="sidebar-container">
        {basketData.map((basket, index) => (
          <ShowBasket key={index} {...basket} />
        ))}
        <BasketSummary />
      </div>
    </div>
  );
}
