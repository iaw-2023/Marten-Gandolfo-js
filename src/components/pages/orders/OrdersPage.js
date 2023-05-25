import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import OrderDetailsTable from './OrderDetailsTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';

function OrdersPage() {
    const {token} = useParams();
    const [showOrder, setShowOrder] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const tokenRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        tokenRef.current.value = token ?? '';
        if(token){
            setShowOrder(true);
            setIsLoading(true);
            fetch(`https://marten-gandolfo-laravel.vercel.app/_api/orders/${token}`)
                .then(response => {
                    if(response.status === 400) throw new Error('Código inválido');
                    if(response.status === 404) throw new Error('Pedido no encontrado');
                    if(!response.ok) throw new Error('Error al cargar el pedido');
                    return response.json();
                })
                .then(data => {
                    setIsLoading(false);
                    return setOrder(data);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage(error.message);
            });
        } else
            setShowOrder(false);
    }, [token])

    const handleTokenChange = event => {
        setIsTokenValid(event.target.value !== '');
    };

    const handleButtonClick = () => {
        navigate(`/orders/${tokenRef.current.value}/details`);
    };
  
    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }

    return (
        <div>
            <h1>Pedidos</h1>
            <p>Ingrese el código de su pedido a continuación para ver mas información.</p>
            <input
                type="text"
                ref={tokenRef}
                onChange={handleTokenChange}
                placeholder="Ingrese su codigo"
            />
            
            <button className="button-link" onClick={handleButtonClick} disabled={!isTokenValid}>Buscar</button>
            {showOrder &&
                (isLoading ? 
                    <LoadingSpinner />
                : (
                    <>
                        <h2>Detalles de su pedido</h2>
                        <p>Numero de pedido: {order.id}</p>
                        <p>Fecha: {order.order_date}</p>
                        <OrderDetailsTable order={order} />
                    </>
            ))}
        </div>
    );
}
  
export default OrdersPage;