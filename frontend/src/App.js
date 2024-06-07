import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Products from "./Pages/Product/Products";
import CreateProduct from "./Pages/Product/CreateProduct";
import EditProduct from "./Pages/Product/EditProduct";
import LayoutAdmin from "./Layouts/LayoutAdmin";
import Profile from "./Pages/User/Profile";
import Cart from "./Pages/Product/Cart";
import ProductDetails from "./Pages/Product/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
        <Route element={<LayoutAdmin />}>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/product/create" element={<CreateProduct />}></Route>
          <Route path="/product/edit/:id" element={<EditProduct />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
