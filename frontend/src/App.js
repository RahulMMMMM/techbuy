import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Computer from "./pages/Computer";
import Deals from "./pages/Deals";
import Home from "./pages/Home";
import Phone from "./pages/Phone";
import Tv from "./pages/Tv";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./Context/CartContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { AuthContextProvider } from "./Context/AuthContext";
import Dashboard from "./Account/Dashboard";


export default function App() {

  return (
    <AuthContextProvider>
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
              <Route path="myaccount/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </>

      </BrowserRouter>
    </CartProvider>
    </AuthContextProvider>
  );
}


