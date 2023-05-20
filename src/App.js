import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage'
import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import OrderDetailsPage from './components/OrderDetailsPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:token/details" element={<OrderDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
