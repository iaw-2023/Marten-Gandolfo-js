import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderDetailsTable from './OrderDetailsTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';

function OrderDetailsPage() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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
  }, [token]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div>
      <h1>Detalles de su pedido</h1>
      <p>Numero de pedido: {order.id}</p>
      <p>Fecha: {order.order_date}</p>
      
      <OrderDetailsTable order={order} />
    </div>
  );
}

export default OrderDetailsPage;