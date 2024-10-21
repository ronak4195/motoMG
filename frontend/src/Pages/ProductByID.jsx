import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./css/ProductByID.css"; // Create a CSS file for custom styles

export default function ProductByID() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productID = queryParams.get("id");

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/products/${productID}`);
      if (response.data.length > 0) {
        setProduct(response.data[0]);
      } else {
        setError("Product not found.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Unable to fetch product details. Please try again later.");
    }
  }, [productID]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    const authToken = localStorage.getItem("auth-token");
    const userString = localStorage.getItem("user");

    if (authToken && userString) {
      try {
        const user = JSON.parse(userString);
        if (Array.isArray(user.cartData)) {
          const existingItem = user.cartData.find(item => item.id === product.id);

          if (existingItem) {
            existingItem.quantity++;
          } else {
            const newCartItem = {
              id: product.id,
              image: product.image,
              name: product.name,
              price: product.price,
              quantity: 1
            };
            user.cartData.push(newCartItem);
          }

          const response = await fetch("http://localhost:4000/update-cart", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ userId: user.id, cartData: user.cartData })
          });

          if (response.ok) {
            console.log("Cart data updated in MongoDB successfully");
            localStorage.setItem("user", JSON.stringify(user));
            alert("Item added to cart successfully");
          } else {
            console.error("Failed to update cart data in MongoDB");
            alert("Failed to update cart data. Please try again.");
          }
        } else {
          alert("Cart data is not properly initialized");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        alert("Failed to parse user data. Please try again.");
      }
    } else {
      alert("Please login to add items to cart");
    }
  };

  if (error) {
    return <div className="errorMessageProdDesc">{error}</div>;
  }

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="productDescPage">
      <div className="productDescContainer">
        <div className="productDescImage">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productDescDetails">
          <h1>{product.name}</h1>
          <p className="productDescCategory">Category: {product.category}</p>
          <p className="productDescDescription">
            Price: ₹{product.price} <span className="productDescMrp"> (MRP: ₹{product.mrp})</span>
          </p>
          <p className="productDescQuantity">In Stock: {product.quantity}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
