import React, { useEffect, useState } from 'react';
import CartTable from './CartTable';
import LoadingSpinner from '../../LoadingSpinner';

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    return (
        <div>
            <h1>Carrito de compras</h1>
            {isLoading ? 
                <LoadingSpinner />
            :
                cartItems.length === 0 ?
                    <div>Carrito de compras vacío</div>
                :
                    <>
                        <CartTable cartItems={cartItems} products={products} handleUnitsChange={handleUnitsChange} handleRemoveItem={handleRemoveItem}/>
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Ingrese su email"
                        />
                        <button onClick={() => buyItems()} disabled={!isEmailValid} >Comprar</button>
                    </>
            }
        </div>
    );
}