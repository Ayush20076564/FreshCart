import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;