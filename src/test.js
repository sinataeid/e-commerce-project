import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import {
  BasketProvider,
  useBasket,
  basketReducer,
  ShowGames,
  calculateTotalPrice,
} from ".App.js"; // Replace with the correct file path

// Unit tests for basketReducer
describe("Basket Reducer", () => {
  test("should add an item to the basket", () => {
    const initialState = [];
    const action = {
      type: "ADD_TO_BASKET",
      payload: {
        title: "Test Game",
        price: 20.0,
        img: "test.jpg",
      },
    };

    const newState = basketReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].title).toBe("Test Game");
    expect(newState[0].quantity).toBe(1);
  });

  test("should increase quantity if the item already exists in the basket", () => {
    const initialState = [
      {
        title: "Test Game",
        price: 20.0,
        img: "test.jpg",
        quantity: 1,
      },
    ];

    const action = {
      type: "ADD_TO_BASKET",
      payload: {
        title: "Test Game",
        price: 20.0,
        img: "test.jpg",
      },
    };

    const newState = basketReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState[0].quantity).toBe(2);
  });

  test("should remove an item from the basket", () => {
    const initialState = [
      {
        title: "Test Game",
        price: 20.0,
        img: "test.jpg",
        quantity: 2,
      },
    ];

    const action = {
      type: "REMOVE_FROM_BASKET",
      payload: {
        title: "Test Game",
      },
    };

    const newState = basketReducer(initialState, action);

    expect(newState).toHaveLength(0);
  });
});

// Integration test for ShowGames component
describe("ShowGames Component", () => {
  test("renders ShowGames component without crashing", () => {
    render(
      <BasketProvider>
        <ShowGames />
      </BasketProvider>
    );
  });
});

// Additional tests for other functions and components can be added here.

// For example, a test for calculateTotalPrice function
describe("calculateTotalPrice function", () => {
  test("should calculate total price correctly", () => {
    const basketData = [
      {
        title: "Test Game 1",
        price: 20.0,
        img: "test1.jpg",
        quantity: 2,
      },
      {
        title: "Test Game 2",
        price: 30.0,
        img: "test2.jpg",
        quantity: 1,
      },
    ];

    const totalPrice = calculateTotalPrice(basketData);

    expect(totalPrice).toBe("70.00");
  });
});
