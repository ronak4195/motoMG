import React, { useEffect, useReducer } from "react";
import { Link} from "react-router-dom";
import "./css/Cart.css";
import { useAppContext } from "../Context/Context";

const initialState = {
  cartItems: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      const newTotal = action.payload.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return {
        ...state,
        cartItems: action.payload,
        total: newTotal,
      };
    case 'UPDATE_CART_TOTAL':
      const updatedTotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return {
        ...state,
        total: updatedTotal,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        total: 0,
      };
    case 'CHANGE_QUANTITY':
      const updatedCartItems = state.cartItems.map((item, index) =>
        index === action.index ? { ...item, quantity: action.quantity } : item
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        total: updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };
    case 'REMOVE_ITEM':
      const filteredCartItems = state.cartItems.filter((_, index) => index !== action.index);
      return {
        ...state,
        cartItems: filteredCartItems,
        total: filteredCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };
    default:
      return state;
  }
}

const Cart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { baseURL } = useAppContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      const authToken = localStorage.getItem("auth-token");
      const userString = localStorage.getItem("user");

      if (authToken && userString) {
        try {
          const user = JSON.parse(userString);
          if (Array.isArray(user.cartData)) {
            dispatch({ type: 'SET_CART_ITEMS', payload: user.cartData });
          } else {
            console.error("Cart data is not properly initialized");
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      } else {
        console.log("User not logged in or token not available.");
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (index, newQuantity) => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    // Update the quantity in the cart items
    dispatch({ type: 'CHANGE_QUANTITY', index, quantity: newQuantity });

    // Update the cart data in user object
    const updatedCartData = user.cartData.map((item, i) => 
      i === index ? { ...item, quantity: newQuantity } : item
    );
    const updatedUser = { ...user, cartData: updatedCartData };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/update-cart`, {
          // const response = await fetch(`${BASE_URL}/update-cart`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ cartData: updatedCartData })
        });
        if (!response.ok) {
          throw new Error('Failed to update cart data');
        }
        console.log('Cart data updated successfully');
      } catch (error) {
        console.error('Error updating cart data:', error);
      }
    }
  };

  const clearCart = async() => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    dispatch({ type: 'CLEAR_CART' });
    const updatedCartData = [];
    const updatedUser = { ...user, cartData: updatedCartData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/update-cart`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ cartData: updatedCartData })
        });
        if (!response.ok) {
          throw new Error('Failed to update cart data');
        }
        console.log('Cart data updated successfully');
      } catch (error) {
        console.error('Error updating cart data:', error);
      }
    }
  };

  const checkout = () => {
    if (state.total > 0) {
      alert(`Total: ₹${state.total.toFixed(2)} - Thank you for your purchase!`);
      clearCart();
    } else {
      alert("Your cart is empty. Please add items to proceed.");
    }
  };

  const removeItem = async (index) => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    dispatch({ type: 'REMOVE_ITEM', index });
    const updatedCartData = user.cartData.filter((_, i) => i !== index);
    const updatedUser = { ...user, cartData: updatedCartData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/update-cart`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ cartData: updatedCartData })
        });
        if (!response.ok) {
          throw new Error('Failed to update cart data');
        }
        console.log('Cart data updated successfully');
      } catch (error) {
        console.error('Error updating cart data:', error);
      }
    }
  };

  return (
    <div className="cart-sidebar">
      <div className="cart-heading">
        <h2>
          <b>Your Cart</b>
        </h2>
      </div>
      <ul className="cart-items">
        {state.cartItems.map((item, index) => (
          <li className="cartProductItem" key={index}>
            <img className="cartProductImage" src={item.image} alt={item.name} />
            <div className="cartProductName">{item.name}</div>
            <div className="cartProductPrice">₹{item.price}</div>
            <div className="cartProductQuantity">
              <button onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))} className="changeQuantityBtn">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(index, item.quantity + 1)} className="changeQuantityBtn">+</button>
            </div>
            <button className="removeButton" onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total-sum">
        <h3>
          Your Total: ₹ <span className="cart-total">{state.total.toFixed(2)}</span>
        </h3>
      </div>
      <div className="clear-cart">
        <button className="btn clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
        <button className="btn clear-cart checkout" onClick={checkout}>
          <Link to = "/checkout" className="checkout-text">Check Out</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
