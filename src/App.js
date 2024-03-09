import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ShowGames, { BasketProvider } from './components/mainPage';

function BasketPage() {
  // You may want to pass basketData and setBasketData if needed
  return (
    // BasketPage component content remains the same
    <div>
      {/* BasketPage component content */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <BasketProvider>
        <div className="App">
          <header className="App-header">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/basket">Basket</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route
              path="/basket"
              element={<BasketPage />}
            />
            <Route
              path="/"
              element={<ShowGames />}
            />
          </Routes>
        </div>
      </BasketProvider>
    </Router>
  );
}

export default App;
