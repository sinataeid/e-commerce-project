import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ShowGames, { BasketProvider } from './components/mainPage';

function BasketPage() {
  return (
    <div>
      
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
                  <Link to="/">Home</Link>
                  <Link to="/basket">Basket</Link>
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
