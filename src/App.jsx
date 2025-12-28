import React from "react";
import { useState } from "react";

import "./App.css";

import Nav from "./PageComps/Nav.jsx";
import Home from "./PageComps/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stitched from "./PageComps/Stitched.jsx";
import Marque from "./PageComps/Marque.jsx";
import Footer from "./PageComps/Footer.jsx";
import { Product } from "./PageComps/Product.jsx";
import Cart from "./PageComps/Cart.jsx";
import Checkout from "./PageComps/Checkout.jsx";
import { ImageProvider } from "./Context/ImageCOntext.jsx";
import User from "./PageComps/User.jsx";
import { AuthProvider } from "./Context/Authcontext.jsx";
import Login from "./Login.jsx";
import Registeration from "./Registeration.jsx";
import { ValidateProvider } from "./Context/ValidateContext.jsx";
import { CartProvider } from "./Context/CarContext.jsx";
import { AdminProvider } from "./Context/AdminContext.jsx";
import Admin from "./PageComps/Admin.jsx";
import SingleOrder from "./PageComps/subcomps/SubAdmin/SingleOrder.jsx";
import AllProducts from "./PageComps/subcomps/SubAdmin/AllProducts.jsx";
import ProductEdit from "./PageComps/subcomps/SubAdmin/ProductEdit.jsx";
import AddProdcut from "./PageComps/subcomps/SubAdmin/AddProdcut.jsx";
import Wishlist from "./PageComps/Wishlist.jsx";

function App() {
  const [selimg, setSelimg] = useState(
    "/images/41_5edcd110-6571-42b6-97e1-2f911aaa87de.webp"
  );
  return (
    <AuthProvider>
      <ValidateProvider>
        <ImageProvider>
          <CartProvider>
            <AdminProvider>
            <Marque />

            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/stitched" element={<Stitched />} />
                <Route path="/stitched/:id" element={<Product />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registeration />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/singleorder" element={<SingleOrder />} />
                <Route path="/admin/AllProducts" element={<AllProducts />} />
                <Route path="/admin/EditProduct" element={<ProductEdit />} />
                <Route path="/admin/AddProduct" element={<AddProdcut />} />




              </Routes>
              <Footer />
            </Router>
            </AdminProvider>
          </CartProvider>
        </ImageProvider>
      </ValidateProvider>
    </AuthProvider>
  );
}

export default App;
