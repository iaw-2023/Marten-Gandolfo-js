import OrderDetailsRow from "./OrderDetailsRow";

export default function OrderDetailsTable({order}){
    let totalCost = 0;
    
    order.order_details.forEach(detail => {
        totalCost += parseFloat(detail.subtotal);
    });

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Producto</th>
                    <th>Unidades</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            
            <tbody>
                {order.order_details.map(detail => <OrderDetailsRow detail={detail} />)}
                <tr>
                    <td></td>
                    <td></td>
                    <td>TOTAL:</td>
                    <td>${totalCost}</td>
                </tr>
            </tbody>
        </table>
    );
}