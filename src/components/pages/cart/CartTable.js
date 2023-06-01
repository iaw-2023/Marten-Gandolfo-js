import { Link } from 'react-router-dom';

export default function CartTable({cartItems, products, handleUnitsChange, handleRemoveItem}){
    const getTotalPrice = () => {
        const subtotals = cartItems.map(item => products[item.id] ? products[item.id].price * item.units : 0);
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
                    products[item.id] &&
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
                                        <div class="page-link disabled">{item.units}</div>
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
                            <button class="btn btn-danger mt-3 mb-3" onClick={() => handleRemoveItem(item.id)}>Eliminar <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td><b>TOTAL:</b></td>
                        <td><b>${getTotalPrice()}</b></td>
                        <td></td>
                    </tr>
            </tbody>
        </table>
    );
}