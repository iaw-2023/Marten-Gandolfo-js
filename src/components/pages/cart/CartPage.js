import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartTable from './CartTable';
import LoadingSpinner from '../../LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.css';
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle';

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

    const handleToastSuccessShow = () => {
        const toastElement = document.getElementById('liveToastSuccess');
        const toast = new Toast(toastElement);
        toast.show();
    };

    const handleToastFailureShow = () => {
        const toastElement = document.getElementById('liveToastFailure');
        const toast = new Toast(toastElement);
        toast.show();
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
                handleToastSuccessShow();
                localStorage.setItem('cart', JSON.stringify([]));
                setCartItems([]);
            } else {
                console.error('Error al realizar la orden:', response.status);
                handleToastFailureShow();
            }
        } catch (error) {
            console.error('Error al realizar la orden:', error);
            handleToastFailureShow();
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
            <div class="borderBottom text-center">
                <h1>Carrito de compras</h1>
                <img style={{padding: '20px'}} src="cart.png" width="200px" alt="..."/>
            </div>
            {isLoading ? 
                <LoadingSpinner />
            :
                cartItems.length === 0 ?
                    <>
                        <h3 class="text-center">Todavía no hay nada por acá</h3>
                        <div class="text-center">
                            <p>No sabes que comprar? Comprate todo!</p>
                            <Link type="button" to="/products" class="btn btn-primary btn-sm">Ver productos</Link>
                        </div>
                    </>
                :
                    <>
                        <CartTable cartItems={cartItems} products={products} handleUnitsChange={handleUnitsChange} handleRemoveItem={handleRemoveItem}/>
                        
                        <div class="card" style={{margin: '30px'}}>
                            <h5 class="card-header">Confirmar compra</h5>
                            <div class="card-body">
                                <h5 class="card-title">Ingrese su correo a continuacion</h5>
                                <div class="input-group mb-3">
                                    <input type="text" value={email} onChange={handleEmailChange} class="form-control" placeholder="Ingrese aquí su correo"/>
                                    <button onClick={buyItems} disabled={!isEmailValid} class="btn btn-primary">Comprar</button>
                                </div>
                                <p class="card-text">Al realizar esta compra usted confirma que ha leido los terminos y condiciones.</p>
                            </div>
                        </div>
                    </>
            }

            <div class="toast-container position-fixed bottom-0 end-0 p-3 data-bs-delay=10">
                <div id="liveToastSuccess" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="https://marten-gandolfo-laravel.vercel.app/logo" width="50" class="rounded me-2" alt="..."/>
                        <strong class="me-auto">Muchas gracias por su compra!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Usted recibira un correo con informacion sobre su pedido en Master Gaming.
                    </div>      
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3 data-bs-delay=10">
                <div id="liveToastFailure" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="https://marten-gandolfo-laravel.vercel.app/logo" width="50" class="rounded me-2" alt="..."/>
                        <strong class="me-auto">Lo sentimos! Hubo un error en su compra.</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Si el error periste comuniquese con el equipo de Master Gaming al correo mastergaming.sa@gmail.com.
                    </div>      
                </div>
            </div>

        </div>
    );
}