import { Link } from 'react-router-dom';

export default function CartTable({cartItems, products, handleUnitsChange, handleRemoveItem}){
    const getTotalPrice = () => {
        const subtotals = cartItems.map(item => products[item.id].price * item.units);
        const totalPrice = subtotals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return totalPrice.toFixed(2);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Producto</th>
                    <th>Unidades</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map(item => (
                <tr key={item.id}>
                    <td>
                        <Link to={'/products/' + item.id}><img src={products[item.id].product_image} alt='' width="150" /></Link>
                    </td>
                    <td>
                        <Link to={'/products/' + item.id}>{products[item.id].name}</Link>
                    </td>
                    <td>
                        <button onClick={() => handleUnitsChange(item.id, -1)}>-</button>
                        {item.units}
                        <button onClick={() => handleUnitsChange(item.id, 1)}>+</button>
                    </td>
                    <td>${(item.units * products[item.id].price).toFixed(2)}</td>
                    <td>
                        <button onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
                    </td>
                </tr>
                ))}
                <tr>
                    <td></td>
                    <td>TOTAL</td>
                    <td></td>
                    <td>${getTotalPrice()}</td>
                </tr>
            </tbody>
        </table>
    );
}