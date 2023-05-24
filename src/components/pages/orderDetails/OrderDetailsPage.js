import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderDetailsTable from './OrderDetailsTable';
import LoadingSpinner from '../../LoadingSpinner';

function OrderDetailsPage() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://marten-gandolfo-laravel.vercel.app/_api/orders/${token}`)
      .then(response => {
        if(!response.ok) throw new Error('Order not found');
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        console.log(data);
        return setOrder(data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
    });
  }, [token]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return <div>Pedido no encontrado</div>;
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