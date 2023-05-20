import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        return setOrder(data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
    });
  }, [token]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!order) {
    return <div>Orden no encontrada</div>;
  }

  return (
    <div>
      <h1>Detalles de su orden</h1>
      <p>Numero de orden: {order.id}</p>
      <p>Fecha de compra: {order.order_date}</p>

      <table>
        <thead>
            <tr>
                <th>ID Producto</th>
                <th>Nombre Producto</th>
                <th>Unidades</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        
        <tbody>
          {order.order_details.map(detail => (
            <tr key={detail.product.product_ID}>
              <td>{detail.product.id}</td>
              <td>{detail.product.name}</td>
              <td>{detail.units}</td>
              <td>{detail.subtotal}</td>
            </tr>
          ))}
        </tbody>
    </table>

    </div>
  );
}

export default OrderDetailsPage;