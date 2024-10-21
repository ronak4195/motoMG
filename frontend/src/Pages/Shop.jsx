import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Item } from '../Components/Item/Item'; // Assuming Item is another component you have

export default function Shop({ category }) {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  // Fetch products by category (Memoize to avoid re-creation on each render)
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/allproducts/category/${category}`);
      
      const data = response.data;
      setProducts(data);

      // Calculate total pages based on the number of products (9 per page)
      const totalPages = Math.ceil(data.length / 9);
      setPagination({ currentPage: 1, totalPages }); // Reset to page 1 on new fetch

      // Set products to display for the first page
      setDisplayedProducts(data.slice(0, 9));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('No products found in this category.');
      } else {
        console.error('Error fetching products:', error.message);
      }
      setProducts([]); // Clear products in case of error
      setDisplayedProducts([]);
      setPagination({ currentPage: 1, totalPages: 1 });
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle pagination
  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 9;
    const endIndex = page * 9;
    setDisplayedProducts(products.slice(startIndex, endIndex));
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div>
      <section id="products" className="section-p1">
        <div className="products-list">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((item, i) => (
              <Item 
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                price={item.price} 
                mrp={item.mrp} 
              />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
        <div className="paginationBox">
          <button 
            disabled={pagination.currentPage === 1} 
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            className="paginationBtn"
          >
            Previous
          </button>

          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button 
            disabled={pagination.currentPage === pagination.totalPages} 
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            className="paginationBtn"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}


// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Item } from "../Components/Item/Item";
// import { useLocation } from "react-router-dom";

// export default function Product() {
//   const [products, setProducts] = useState([]);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//   });
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const productCategory = queryParams.get("category");

//   const fetchProducts = useCallback(async (page = 1) => {
//     try {
//       const params = { page };
//       const response = await axios.get(
//         `http://localhost:4000/allproducts?category=${productCategory}`,
//         {
//           params,
//         }
//       );
//       setProducts(response.data.products);
//       setPagination({
//         currentPage: page,
//         totalPages: response.data.totalPages,
//       });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   }, [productCategory]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   return (
//     <div>
//       <section id="products" className="section-p1">
//         <div className="banner">
//           <h2 className="banner-text">Featured Products</h2>
//           <button>Explore More</button>
//         </div>

//         <div className="products-list">
//           {Array.isArray(products) &&
//             products.map((item, i) => (
//               <Item
//                 key={i}
//                 id={item.id}
//                 name={item.name}
//                 image={item.image}
//                 price={item.price}
//                 mrp={item.mrp}
//               />
//             ))}
//         </div>
//         <div className="paginationBox">
//           <button
//             disabled={pagination.currentPage === 1}
//             onClick={() => fetchProducts(pagination.currentPage - 1)}
//           >
//             Previous
//           </button>

//           <span>
//             Page {pagination.currentPage} of {pagination.totalPages}
//           </span>

//           <button
//             disabled={pagination.currentPage === pagination.totalPages}
//             onClick={() => fetchProducts(pagination.currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
