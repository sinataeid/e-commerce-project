import React, { useState, createContext, useContext, useReducer } from "react";
import "./mainPage.css";
import Game, {
  actionGames,
  adventureGames,
  shooterGames,
  rpgGames,
} from "../model/gamesData";

// Define Basket class outside the component
class Basket extends Game {
  constructor(title, price, img, quantity) {
    super(
      title,
      DEFAULT_DESCRIPTION,
      price,
      DEFAULT_PLATFORM,
      "Default developer",
      img
    );
    this.quantity = quantity || 1;
  }
}

const DEFAULT_DESCRIPTION = "Default description";
const DEFAULT_PLATFORM = "Default platform";

const CATEGORY_TITLES = {
  action: "Action Games",
  shooter: "Shooter Games",
  adventure: "Adventure Games",
  rpg: "Role Playing Games",
};

const BasketContext = createContext();

const basketReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const { title } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.title === title);

      if (existingItemIndex !== -1) {
        // Item already exists in the basket, increase quantity
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Item is not in the basket, add it
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "REMOVE_FROM_BASKET":
      const { title: removeTitle } = action.payload;
      const updatedBasket = state.map((item) => {
        if (item.title === removeTitle) {
          // Decrease quantity, ensure it's greater than or equal to zero
          return { ...item, quantity: Math.max(item.quantity - 1, 0) };
        }
        return item;
      });

      // Filter out items with quantity zero
      return updatedBasket.filter((item) => item.quantity > 0);

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
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};

const BasketItem = ({ title, price, img, quantity, removeFromBasket }) => (
  <section className="basket-item">
    <h4>Title: {title}</h4>
    <p>Price: ${price.toFixed(2)}</p>
    <p>Quantity: {quantity}</p>
    <img className="img-size" src={img} alt={title} />
    <button className="remove-button" onClick={() => removeFromBasket(title)}>
      Remove from Basket
    </button>
  </section>
);

const AddToBasketButton = ({ title, price, img, addToBasket }) => (
  <button
    className="add-to-basket-button"
    onClick={() => addToBasket(title, price, img)}
  >
    Add to Basket
  </button>
);

const GameItem = ({ game, showDetails, addToBasket }) => (
  <div className="game-item">
    <img
      className="img-size"
      src={game.img}
      alt={game.title}
      onClick={() => showDetails(game)}
    />
    <h3 className="game-title">{game.title}</h3>
    <AddToBasketButton
      title={game.title}
      price={game.price}
      img={game.img}
      addToBasket={addToBasket}
    />
  </div>
);

const GameList = ({ games, showDetails, addToBasket }) => (
  <div className="img-container">
    {games.map((game, index) => (
      <GameItem
        key={index}
        game={game}
        showDetails={showDetails}
        addToBasket={addToBasket}
      />
    ))}
  </div>
);

const GamesCategoryList = ({ category, games, showDetails, addToBasket }) => (
  <div>
    <h2>{CATEGORY_TITLES[category]}</h2>
    <GameList
      games={games}
      showDetails={showDetails}
      addToBasket={addToBasket}
    />
  </div>
);

const ActionGamesList = ({ showDetails, addToBasket }) => (
  <GamesCategoryList
    category="action"
    games={actionGames}
    showDetails={showDetails}
    addToBasket={addToBasket}
  />
);

const ShooterGamesList = ({ showDetails, addToBasket }) => (
  <GamesCategoryList
    category="shooter"
    games={shooterGames}
    showDetails={showDetails}
    addToBasket={addToBasket}
  />
);

const AdventureGamesList = ({ showDetails, addToBasket }) => (
  <GamesCategoryList
    category="adventure"
    games={adventureGames}
    showDetails={showDetails}
    addToBasket={addToBasket}
  />
);

const RpgGamesList = ({ showDetails, addToBasket }) => (
  <GamesCategoryList
    category="rpg"
    games={rpgGames}
    showDetails={showDetails}
    addToBasket={addToBasket}
  />
);

const BasketSummary = ({ basketData }) => (
  <div className="basket-summary">
    <h2>Basket Summary</h2>
    <p>Total Price: ${calculateTotalPrice(basketData)}</p>
  </div>
);

const ShowBasket = ({ title, price, img, quantity, removeFromBasket }) => (
  <div>
    <BasketItem
      title={title}
      price={price}
      img={img}
      quantity={quantity}
      removeFromBasket={removeFromBasket}
    />
  </div>
);

const calculateTotalPrice = (basketData) => {
  const total = basketData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return total.toFixed(2);
};

export default function ShowGames() {
  const [selectedGame, setSelectedGame] = useState(null);
  const { basketData, dispatch } = useBasket();

  const showGameDetails = (game) => {
    setSelectedGame(game);
  };

  const resetSelectedGame = () => {
    setSelectedGame(null);
  };

  const addToBasket = (title, price, img) => {
    const existingItem = basketData.find((item) => item.title === title);

    if (existingItem) {
      dispatch({
        type: "ADD_TO_BASKET",
        payload: { ...existingItem, quantity: existingItem.quantity + 1 },
      });
    } else {
      dispatch({
        type: "ADD_TO_BASKET",
        payload: new Basket(title, price, img, 1),
      });
    }
  };

  const removeFromBasket = (title) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: { title } });
  };

  return (
    <div className="main-container">
      <div className="game-list-container">
        {selectedGame ? (
          <div>
            <ShowBasket {...selectedGame} removeFromBasket={removeFromBasket} />
            <button className="back-button" onClick={resetSelectedGame}>
              <span>Back to Games</span>
            </button>
          </div>
        ) : (
          <>
            <ActionGamesList
              showDetails={showGameDetails}
              addToBasket={addToBasket}
            />
            <ShooterGamesList
              showDetails={showGameDetails}
              addToBasket={addToBasket}
            />
            <AdventureGamesList
              showDetails={showGameDetails}
              addToBasket={addToBasket}
            />
            <RpgGamesList
              showDetails={showGameDetails}
              addToBasket={addToBasket}
            />
          </>
        )}
      </div>

      <div className="sidebar-container">
        {basketData.map((basket, index) => (
          <ShowBasket
            key={index}
            {...basket}
            removeFromBasket={removeFromBasket}
          />
        ))}
        <BasketSummary basketData={basketData} />
      </div>
    </div>
  );
}
