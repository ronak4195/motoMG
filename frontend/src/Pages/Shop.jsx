import { useState, useEffect, useCallback } from "react";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import { Item } from "../Components/Item/Item";
import { useAppContext } from "../Context/Context"; // Import AppContext to get baseURL

export default function Shop({ category }) {
  const { baseURL } = useAppContext(); // Use baseURL from context
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 9, // Number of products per page
  });
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/allproducts/category/${category}`
      );
      const data = response.data;
      setProducts(data);

      // Calculate total pages based on pageSize
      const totalPages = Math.ceil(data.length / pagination.pageSize);
      setPagination((prev) => ({ ...prev, currentPage: 1, totalPages })); // Reset to page 1

      // Set products for the first page
      setDisplayedProducts(data.slice(0, pagination.pageSize));
      setError(null); // Clear any previous errors
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No products found in this category.");
      } else {
        setError("Error fetching products. Please try again later.");
      }
      setProducts([]); // Clear products on error
      setDisplayedProducts([]);
      setPagination((prev) => ({ ...prev, currentPage: 1, totalPages: 1 }));
    }
  }, [baseURL, category, pagination.pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * pagination.pageSize;
    const endIndex = page * pagination.pageSize;
    setDisplayedProducts(products.slice(startIndex, endIndex));
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div>
      {isLoading ? (
        <div style={{height: "90vh", display: "grid", justifyContent: "center", backgroundColor: "white", alignItems: "center"}}>
        <GridLoader
          style={{
            margin: "70px auto",
            borderColor: "black",
            display: "block",
          }}
        />
        </div>
        
      ) : (
        <section id="products" className="section-p1">
          <div className="products-list">
            {error ? (
              <p>{error}</p>
            ) : (
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
      )}
    </div>
  );
}
