import { useNavigate } from "react-router-dom";
import '../../../App.css';

export default function OrdersTable({ orders }){
    
    const navigate = useNavigate();

    orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
    
    const fixDateHours = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          };
        date.setHours(date.getHours() - 3);
        return date.toLocaleString('es-AR', options);
    }

    return (
        <div class="card">
            <table class="table text-center align-middle">
                <thead>
                    <th class="p-3"></th>
                    <th class="p-3">Fecha</th>
                    <th class="p-3">Precio</th>
                </thead>
                <tbody>
                    {orders.map(order => (
                            <tr class="order-tr" key={order.id} onClick={() => {navigate('/orders/' + order.id)}}>
                                <td class="text-center align-middle"><img src={`data:image/webp;base64,${order.image}`} alt='' width="150" /></td>
                                <td>{fixDateHours(order.order_date)}</td>
                                <td>${order.price}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}