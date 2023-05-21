import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OrdersPage() {
    const [token, setToken] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);

    const handleTokenChange = event => {
        setToken(event.target.value);
    };

    const handleButtonClick = () => {
        window.location.href = `/orders/${token}/details`;
    };

    useEffect(() => {
        setIsTokenValid(token !== '');
    }, [token]);

    return (
        <div>
            <h1>Pedidos</h1>
            <p>Ingrese el token de su pedido a continuacion para ver mas informacion.</p>
            <input
                type="text"
                value={token}
                onChange={handleTokenChange}
                placeholder="Ingrese su token"
            />
            
            <button className="button-link" onClick={handleButtonClick} disabled={!isTokenValid}>Buscar</button>

        </div>
    );
}
  
export default OrdersPage;