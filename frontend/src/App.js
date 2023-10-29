import { useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Computer from "./pages/Computer";
import Deals from "./pages/Deals";
import Home from "./pages/Home";
import Phone from "./pages/Phone";
import Tv from "./pages/Tv";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./CartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


export default function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <>
          <head>
            <title>TechBuy</title>
          </head>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home  />} />
              <Route path="deals" element={<Deals />} />
              <Route path="computers" element={<Computer/>} />
              <Route path="phones" element={<Phone />} />
              <Route path="tvs" element={<Tv />} />
              <Route path="cart" element={<Cart />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </div>
        </>

      </BrowserRouter>
    </CartProvider>
  );
}


