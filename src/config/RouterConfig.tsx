import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/registerPage/RegisterPage";
import LoginPage from "../pages/loginPage/LoginPage";
import HomePage from "../pages/HomePage";
import AccountDetails from "../pages/AccountDetails/AccountDetails";

import Privacy from "../pages/Privacy/Privacy";
import ProductList from "../pages/Products/ProductList";
import ProductDetails from "../pages/Products/ProductDetails";
import PastOrders from "../pages/PastOrders/PastOrders";

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    
      <Route path="/home" element={<HomePage />}>
        <Route path="account-details" element={<AccountDetails />} />
        <Route path="products" element={<ProductList />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="product-details/:id" element={<ProductDetails />} /> 
        <Route path="past-orders" element={<PastOrders />} /> 
      </Route>
      
    </Routes>
  );
}
