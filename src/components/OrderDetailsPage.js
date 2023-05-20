import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function OrderDetailsPage() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let totalCost = 0;

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

  order.order_details.forEach(detail => {
    totalCost += parseFloat(detail.subtotal);
  });

  return (
    <div>
      <h1>Detalles de su orden</h1>
      <p>Numero de orden: {order.id}</p>
      <p>Fecha de compra: {order.order_date}</p>

      <table>
        <thead>
            <tr>
                <th>IMG</th>
                <th>Nombre Producto</th>
                <th>Unidades</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        
        <tbody>
          {order.order_details.map(detail => (
            <tr key={detail.product.id}>
              <td>
                <Link to={'/products/' + detail.product.id}><img src={""} alt='' width="150" /></Link>
              </td>
              <td>
                <Link to={'/products/' + detail.product.id}>{detail.product.name}</Link>
              </td>

              <td>{detail.units}</td>
              <td>{detail.subtotal}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>TOTAL:</td>
            <td>{totalCost}</td>
          </tr>
        </tbody>
    </table>

    </div>
  );
}

export default OrderDetailsPage;