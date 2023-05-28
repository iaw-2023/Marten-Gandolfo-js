import OrderDetailsRow from "./OrderDetailsRow";

export default function OrderDetailsTable({order}){
    let totalCost = 0;
    
    order.order_details.forEach(detail => {
        totalCost += parseFloat(detail.subtotal);
    });

    return (
        <table class="table text-center align-middle">
            <thead>
                <tr>
                    <th class="p-3"></th>
                    <th class="p-3">Producto</th>
                    <th class="p-3">Unidades</th>
                    <th class="p-3">Subtotal</th>
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