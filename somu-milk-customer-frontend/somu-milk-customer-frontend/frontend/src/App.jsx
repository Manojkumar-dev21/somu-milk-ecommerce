import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/CUSTOMER/Home/Home";
import Products from "./pages/CUSTOMER/Products/Products";
import ProductDetails from "./pages/CUSTOMER/ProductDetails/ProductDetails";
import Cart from "./pages/CUSTOMER/Cart/Cart";
import Checkout from "./pages/CUSTOMER/Checkout/Checkout";
import Offers from "./pages/CUSTOMER/Offers/Offers";
import About from "./pages/CUSTOMER/About/About";
import OrderSuccess from "./pages/CUSTOMER/OrderSuccess/OrderSuccess";
import Login from "./pages/CUSTOMER/Login/Login";
import Account from "./pages/CUSTOMER/Account/Account";
import Notifications from "./pages/CUSTOMER/Notifications/Notifications";
import Register from "./pages/CUSTOMER/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


// Shared design theme (keep this LAST so it can refine page styles)
import "./theme.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* CUSTOMER (login needed) */}
            <Route
              path="/checkout"
              element={<ProtectedRoute><Checkout /></ProtectedRoute>}
            />
            <Route
              path="/order-success"
              element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}
            />
            <Route
              path="/account"
              element={<ProtectedRoute><Account /></ProtectedRoute>}
            />
            <Route
              path="/account/notifications"
              element={<ProtectedRoute><Notifications /></ProtectedRoute>}
            />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
