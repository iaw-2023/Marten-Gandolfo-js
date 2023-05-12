import { Link } from 'react-router-dom';

export default function NavBar(){
    return(
        <nav class="navbar navbar-expand-lg border-bottom border-3 mb-3">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Master Gaming</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link class="nav-link" to="/">Inicio</Link>
                    <Link class="nav-link" to="/products">Productos</Link>
                    <Link class="nav-link" to="/cart">Carrito</Link>
                    <Link class="nav-link" to="/orders">Pedidos</Link>
                </div>
                </div>
            </div>
        </nav>
    );
}

