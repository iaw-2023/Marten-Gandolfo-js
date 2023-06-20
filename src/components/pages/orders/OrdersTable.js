import { useNavigate } from "react-router-dom";
import '../../../App.css';

export default function OrdersTable({ orders }){
    const navigate = useNavigate();

    console.log(orders);
    return (
        <div class="card">
            <table class="table text-center align-middle">
                <thead>
                    <th class="p-3" width={150}></th>
                    <th class="p-3">Fecha</th>
                    <th class="p-3">Precio</th>
                </thead>
                <tbody>
                    {orders.map(order => (
                            <tr class="order-tr" key={order.id} onClick={() => {navigate('/orders/' + order.id)}}>
                                <td width={150}><img src={`data:image/webp;base64,${order.image}`} alt='' width="150" /></td>
                                <td>{order.order_date}</td>
                                <td>${order.price}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}