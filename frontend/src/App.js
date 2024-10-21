import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Pages/Checkout";
import Product from "./Pages/Product"
import Products from "./Pages/ProductByID"

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Index/>}></Route>
            <Route exact path="/helmets" element={<Shop category={"helmets"}/>}></Route>
            <Route exact path="/ridinggears" element={<Shop category={"ridinggears"}/>}></Route>
            <Route exact path="/accessories" element={<Shop category={"accessories"} />}></Route>
            <Route exact path="/contactus" element={<Contact/>}></Route>
            <Route exact path="/product" element={<Product/>}></Route>
            <Route exact path="/products" element={<Products/>}></Route>
            {/* <Route path=':productId' element={<Product/>}></Route> */}
            <Route exact path="/cart" element={<Cart/>}></Route>
            <Route exact path="/login" element={<LoginSignup/>}></Route>
            <Route exact path="/checkout" element={<Checkout/>}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
