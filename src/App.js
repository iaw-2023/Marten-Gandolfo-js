import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/HomePage'
import ProductsPage from './components/ProductsPage'
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
