import { Link } from 'react-router-dom';

export default function CartTable({cartItems, products, handleUnitsChange, handleRemoveItem}){
    const getTotalPrice = () => {
        const subtotals = cartItems.map(item => products[item.id].price * item.units);
        const totalPrice = subtotals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return totalPrice.toFixed(2);
    }

    return (
        <table class="table text-center align-middle">
            <thead>
                <tr>
                    <th class="p-3"></th>
                    <th class="p-3">Producto</th>
                    <th class="p-3">Unidades</th>
                    <th class="p-3">Subtotal</th>
                    <th class="p-3"></th>
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

                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li class="page-item">
                                    <button class="page-link" onClick={() => handleUnitsChange(item.id, -1)} aria-label="Previous">
                                        <span aria-hidden="true">-</span>
                                    </button>
                                </li>
                                <li class="page-item">
                                    <a class="page-link disabled">{item.units}</a>
                                </li>
                                <li class="page-item">
                                    <button class="page-link" onClick={() => handleUnitsChange(item.id, 1)} aria-label="Next">
                                        <span aria-hidden="true">+</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {/* <button onClick={() => handleUnitsChange(item.id, -1)}>-</button>
                        {item.units}
                        <button onClick={() => handleUnitsChange(item.id, 1)}>+</button> */}

                    </td>
                    <td>${(item.units * products[item.id].price).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger mt-3 mb-3" onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
                    </td>
                </tr>
                ))}
                <tr>
                    <td></td>
                    <td>TOTAL</td>
                    <td></td>
                    <td>${getTotalPrice()}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}