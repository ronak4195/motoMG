import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Item } from "../Components/Item/Item";
import { useLocation } from "react-router-dom";
import { useAppContext } from '../Context/Context';

export default function Product() {
  const { baseURL } = useAppContext();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productName = queryParams.get("name");
  const productCategory = queryParams.get("category");

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      const params = { page };

      // Build the dynamic URL based on query parameters
      let url = `${baseURL}/allproducts?`;
      if (productName) {
        url += `name=${productName}&`;
      }
      if (productCategory) {
        url += `category=${productCategory}&`;
      }
      url = url.slice(0, -1); // Remove the trailing "&" or "?" if needed

      const response = await axios.get(url, { params });
      setProducts(response.data.products);
      setPagination({
        currentPage: page,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [baseURL, productName, productCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <section id="products" className="section-p1">
        <div className="banner">
          <h2 className="banner-text">Featured Products</h2>
          <button>Explore More</button>
        </div>

        <div className="products-list">
          {Array.isArray(products) &&
            products.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                mrp={item.mrp}
              />
            ))}
        </div>
        <div className="paginationBox">
          <button
            disabled={pagination.currentPage === 1}
            onClick={() => fetchProducts(pagination.currentPage - 1)}
            className="paginationBtn"
          >
            Previous
          </button>

          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => fetchProducts(pagination.currentPage + 1)}
            className="paginationBtn"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
