// BasketDetails.jsx
import React from 'react';

const BasketDetails = ({ title, price, img, removeFromBasket }) => (
  <div>
    <h2>Basket Details</h2>
    <p>Title: {title}</p>
    <p>Price: {price}</p>
    <img className="img-size" src={img} alt="none" />
    <button onClick={() => removeFromBasket(title)}>Remove from Basket</button>
  </div>
);

export default BasketDetails;
