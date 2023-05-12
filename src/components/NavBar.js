export default function NavBar(){
    return(
        <nav class="navbar navbar-expand-lg border-bottom border-3 mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Master Gaming</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="/">Inicio</a>
                    <a class="nav-link" href="/products">Productos</a>
                    <a class="nav-link" href="/cart">Carrito</a>
                    <a class="nav-link" href="/orders">Pedidos</a>
                </div>
                </div>
            </div>
        </nav>
    );
}

