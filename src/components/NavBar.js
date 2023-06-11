import { Link, useLocation } from 'react-router-dom';
import '../App.css';

export default function NavBar(){
    const location = useLocation();

    return(
        <nav class="navbar navbar-expand-lg mb-1">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">
                    <div class="block">
                        <img src="https://marten-gandolfo-laravel-promocion.vercel.app/logo_name" width="250" alt="logo"></img>
                    </div>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Inicio</Link>
                        <Link class={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`} to="/products">Productos</Link>
                        <Link class={`nav-link ${location.pathname.startsWith('/cart') ? 'active' : ''}`} to="/cart">Carrito</Link>
                        <Link class={`nav-link ${location.pathname.startsWith('/orders') ? 'active' : ''}`} to="/orders">Pedidos</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

