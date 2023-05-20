import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartPage(){
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState(''); // Nuevo estado para el campo de texto
    const [isEmailValid, setIsEmailValid] = useState(false); // Estado para controlar la validez del campo de texto

    console.log(products);
  
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartItems);
    
        const fetchProductDetails = async () => {
            const productIds = cartItems.map(item => item.id);
            const productRequests = productIds.map(id =>
              fetch(`https://marten-gandolfo-laravel.vercel.app/_api/products/${id}`)
                .then(response => response.json())
                .then(data => ({ ...data, units: cartItems.find(item => item.id === id).units }))
            );
      
            const products = await Promise.all(productRequests);
            const productsObject = products.reduce((obj, product) => {
              obj[product.id] = product;
              return obj;
            }, {});
            setProducts(productsObject);
            setIsLoading(false);
        };
    
        fetchProductDetails();
      }, []);

    const getTotalPrice = () => {
        const subtotals = cartItems.map(item => products[item.id].price * item.units);
        const totalPrice = subtotals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return totalPrice.toFixed(2);
    }

    const handleRemoveItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const buyItems = async () => {
        try {
            const order = {
                email: email,
                products: cartItems.map(item => ({
                    id: item.id,
                    units: item.units
                }))
            };
        
            const response = await fetch('https://marten-gandolfo-laravel.vercel.app/_api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
        
            if (response.ok) {
                console.log('Orden realizada exitosamente');
                alert("Orden realizada exitosamente");
                // Aca se puede agregar lógica adicional, como vaciar el carrito
            } else {
                console.error('Error al realizar la orden:', response.status);
                alert('Error al realizar la orden:', response.status);
            }
        } catch (error) {
            console.error('Error al realizar la orden:', error);
            alert('Error al realizar la orden:', error);
        }
    };
      

    const handleUnitsChange = (itemId, unitsChange) => {
        const updatedCartItems = cartItems.map(item => {
          if (item.id === itemId && item.units + unitsChange > 0) {
            return {
              ...item,
              units: item.units + unitsChange
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
      };
    
    useEffect(() => {
        setIsEmailValid(email !== '');
    }, [email]);

    return (
        <div>
            <h1>Carrito de compras</h1>
            {isLoading ? 
                <div>Cargando...</div>
            :
                cartItems.length === 0 ?
                    <div>Carrito de compras vacío</div>
                :
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
                                <td>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Ingrese su email"
                                    />
                                    <button onClick={() => buyItems()} disabled={!isEmailValid} >Comprar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            }
        </div>
    );
}