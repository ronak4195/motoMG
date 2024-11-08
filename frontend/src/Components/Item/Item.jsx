import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/Context";

export const Item = (props) => {
  const { baseURL } = useAppContext(); 
  const { id, image, name, price, mrp } = props;
  const navigate = useNavigate();
  //const fallbackImage = "../Assets/img/motorcycleoffroad.jpg";

  const handleClick = () => {
    navigate(`/products?id=${props.id}`);
  };

  const handleAddToCart = async () => {
    const authToken = localStorage.getItem('auth-token');
    const userString = localStorage.getItem('user');
    if (authToken && userString) {
      try {
        const user = JSON.parse(userString);
        if (Array.isArray(user.cartData)) {
          const existingItem = user.cartData.find(item => item.id === id);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            const newCartItem = { id, image, name, price, quantity: 1 };
            user.cartData.push(newCartItem);
          }
          const response = await fetch(`${baseURL}/update-cart`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ userId: user.id, cartData: user.cartData }),
          });
          if (response.ok) {
            console.log('Cart data updated in MongoDB successfully');
            localStorage.setItem('user', JSON.stringify(user));
            alert('Item added to cart successfully');
          } else {
            console.error('Failed to update cart data in MongoDB');
            alert('Failed to update cart data. Please try again.');
          }
        } else {
          alert('Cart data is not properly initialized');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        alert('Failed to parse user data. Please try again.');
      }
    } else {
      alert('Please login to add items to cart');
      navigate('/login');
    }
  };

  // const handleImageError = (e) => {
  //   e.target.src = fallbackImage; 
  // };
  return (
    <div className="product-card">
      <img
        src={image 
          // || fallbackImage
        }
        className="product-image"
        alt={name}
        onClick={handleClick}
        // onError={handleImageError} 
      />
      <div className="product-description">
        <span>{name}</span>
        <h5>Premium Gears</h5>
        <div className="star">
          <i className="fa fa-star checked" />
          <i className="fa fa-star checked" />
          <i className="fa fa-star checked" />
          <i className="fa fa-star checked" />
          <i className="fa fa-star checked" />
        </div>
        <div className="product-price">
          <h3>₹ {price}</h3>
          <h5><s>₹ {mrp}</s></h5>
        </div>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        <i className="fa fa-shopping-cart cart" />
      </button>
    </div>
  );
};
