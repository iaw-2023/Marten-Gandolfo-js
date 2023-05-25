import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function OrdersPage() {
    const [token, setToken] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const navigate = useNavigate();

    const handleTokenChange = event => {
        setToken(event.target.value);
    };

    const handleButtonClick = () => {
        navigate(`/orders/${token}/details`);
    };

    useEffect(() => {
        setIsTokenValid(token !== '');
    }, [token]);

    return (
        <div>
            <h1>Pedidos</h1>
            <p>Ingrese el código de su pedido a continuación para ver mas información.</p>
            <input
                type="text"
                value={token}
                onChange={handleTokenChange}
                placeholder="Ingrese su codigo"
            />
            
            <button className="button-link" onClick={handleButtonClick} disabled={!isTokenValid}>Buscar</button>

        </div>
    );
}
  
export default OrdersPage;