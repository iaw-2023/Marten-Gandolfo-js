import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartTable from './CartTable';
import LoadingSpinner from '../../LoadingSpinner';
import ToastComponent from '../../ToastComponent';
import 'bootstrap/dist/css/bootstrap.css';
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle';
import ErrorMessage from '../../ErrorMessage';
import Login from '../account/Login';
import { AuthContext } from '../account/AuthProvider';

export default function CartPage(){
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    
    const handleRemoveItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const handleDeletedProducts = () => {
        const filteredItems = cartItems.filter(item => Object.keys(products).includes(item.id.toString()));
        setCartItems(filteredItems);
        products.deletedProducts = false;
        setProducts(products);
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
                products: cartItems.map(item => ({
                    id: item.id,
                    units: item.units
                }))
            };
        
            const shouldConfirm = window.confirm('¿Quieres confirmar la compra?');
            if (shouldConfirm) {
                setIsLoading(true);
                setErrorMessage('');
                const response = await fetch(process.env.REACT_APP_API_URL + '_api/orders', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                });
                
                if (response.ok) {
                    handleToastSuccessShow();
                    setCartItems([]);
                } else {
                    handleToastFailureShow();
                    fetchProductDetails();
                }
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error al realizar la orden:', error);
            handleToastFailureShow();
            setIsLoading(false);
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
    };
        
    const fetchProductDetails = async () => {
        const productIds = cartItems.map(item => item.id);
        const products = {};
        const productRequests = productIds.map(id =>
            fetch(process.env.REACT_APP_API_URL + `_api/products/${id}`)
              .then(response => {
                if(!response.ok) throw new Error('Producto no encontrado');
                return response.json();
            })
              .then(data => (products[id] = data))
              .catch(error => {
                handleRemoveItem(id);
                products.deletedProducts = true;
                setErrorMessage('Error al cargar alguno de los productos');
            })
          );

        await Promise.all(productRequests);
        setProducts(products);
        setIsLoading(false);
    };
  
    useEffect(() => {
        fetchProductDetails();
      }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        if(products && products.deletedProducts)
            handleDeletedProducts();
    }, [products]);

    return (
        <div>
            {errorMessage  && <ErrorMessage message={errorMessage} />}
            <div class="borderBottom text-center">
                <h1>Carrito de compras</h1>
                <img class='cart-image' src="cart.png" width="200px" alt="..."/>
            </div>
            {isLoading || !products || products.deletedProducts ? 
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
                        {isAuthenticated ? 
                            <div class="card">
                                <h5 class="card-header">Confirmar compra</h5>
                                <div class="card-body">
                                    <p class="card-text">Al realizar esta compra usted confirma que ha leido los terminos y condiciones.</p>
                                    <button onClick={buyItems} class="btn btn-primary">Comprar</button>
                                </div>
                            </div>
                        
                        :
                            <div>
                                <h3 class="m-4">Inicie sesión para comprar</h3>
                                <Login />
                            </div>
                        }

                        
                    </>
            }

            <ToastComponent id={'liveToastSuccess'} toastTitle={'Muchas gracias por su compra!'} toastBody={'Usted recibira un correo con informacion sobre su pedido en Master Gaming.'} addButton={false} buttonText={''} buttonLink={''}/>

            <ToastComponent id={'liveToastFailure'} toastTitle={'Lo sentimos! Hubo un error en su compra.'} toastBody={'Si el error periste comuniquese con el equipo de Master Gaming al correo mastergaming.sa@gmail.com.'} addButton={false} buttonText={''} buttonLink={''}/>

        </div>
    );
}