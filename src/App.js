import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/pages/home/HomePage'
import ProductsPage from './components/pages/products/ProductsPage'
import CartPage from './components/pages/cart/CartPage';
import OrdersPage from './components/pages/orders/OrdersPage';
import ProductDetailsPage from './components/pages/productDetails/ProductDetailsPage';
import OrderDetailsPage from './components/pages/orderDetails/OrderDetailsPage';
import NavBar from './components/NavBar';
import AccountPage from './components/pages/account/AccountPage';
import { AuthProvider } from './components/pages/account/AuthProvider';
import ForgotPassword from './components/pages/account/ForgotPassword';
import ResetPassword from './components/pages/account/ResetPassword';

function App() {
  return (
      <Router>
        <AuthProvider>
          <div>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
