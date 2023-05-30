import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../App.css';

export default function NavBar(){
    const location = useLocation();

    useEffect(() => {
        const handleNavLinkClick = (e) => {
            if (e.currentTarget.pathname === location.pathname) {
                window.location.reload();
            }
        };

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', handleNavLinkClick);
        });

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener('click', handleNavLinkClick);
            });
        };
    }, [location]);

    return(
        <nav class="navbar navbar-expand-lg mb-1" style={{ backgroundColor: '#F0F0F0' }}>
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">
                    <div class="block">
                        <img src="https://marten-gandolfo-laravel.vercel.app/logo_name" width="250" alt="logo"></img>
                    </div>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-link" style={{ fontSize: '20px' }} to="/">Inicio</Link>
                        <Link class="nav-link" style={{ fontSize: '20px' }} to="/products">Productos</Link>
                        <Link class="nav-link" style={{ fontSize: '20px' }} to="/cart">Carrito</Link>
                        <Link class="nav-link" style={{ fontSize: '20px' }} to="/orders">Pedidos</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

