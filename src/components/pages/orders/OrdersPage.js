import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import OrdersTable from './OrdersTable';
import OrderDetailsTable from './OrderDetailsTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from '../account/AuthProvider';
import Login from '../account/Login';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated } = useContext(AuthContext);

    const fetchOrders = () => {
        if(isAuthenticated)
            fetch(process.env.REACT_APP_API_URL + '_api/orders', {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => {
                    //TODO ver si no esta autenticado
                    if(!response.ok) throw new Error('Error al cargar los pedidos');
                    return response.json();
                })
                .then(data => {
                    setOrders(data.orders);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage(error.message);
                });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [isAuthenticated])

    /* useEffect(() => {
        tokenRef.current.value = token ?? '';
        if(token){
            setShowOrder(true);
            setIsLoading(true);
            fetch(process.env.REACT_APP_API_URL + `_api/orders/${token}`)
                .then(response => {
                    if(response.status === 400) throw new Error('Código inválido');
                    if(response.status === 404) throw new Error('Pedido no encontrado');
                    if(!response.ok) throw new Error('Error al cargar el pedido');
                    return response.json();
                })
                .then(data => {
                    setIsLoading(false);
                    return setOrder(data);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage(error.message);
            });
        } else
            setShowOrder(false);
    }, [token])

    const handleTokenChange = event => {
        setIsTokenValid(event.target.value !== '');
    };

    const handleButtonClick = () => {
        navigate(`/orders/${tokenRef.current.value}/details`);
    }; */

    return (
        <div class="borderBottom text-center">
            <h1>Pedidos</h1>
            <img src="/shopping_bag.png" width="200px" alt="..."/>
            {isAuthenticated ? (
                isLoading ? 
                    <LoadingSpinner />
                :
                    errorMessage ?
                        <ErrorMessage errorMessage={errorMessage} />
                    :
                        <OrdersTable orders={orders} />
                )
            :
                <div>
                    <h3 class="m-4">Inicie sesión para ver sus pedidos</h3>
                    <Login />
                </div>
            }
            {/* <div class="card">
                <div class="row align-items-center">
                    <div class="col-sm-4 text-center">
                        <h1>Pedidos</h1>
                        <img src="/shopping_bag.png" width="200px" alt="..."/>
                    </div>
                    <div class="col-sm-8 text-center">
                        <div class="card-body">
                            <h5 class="card-title">Consulte su pedido aqui</h5>
                            <p class="card-text">Para poder verlo, debera ingresar el token enviado a su correo a continuacion.</p>
                            <div class="input-group mb-3">
                                <input type="text" ref={tokenRef} onChange={handleTokenChange} class="form-control" placeholder="Ingrese su token"/>
                                <button onClick={handleButtonClick} disabled={!isTokenValid} class="button-link btn btn-primary">Buscar pedido</button>
                            </div>
                        </div>
                    </div>
                </div>
                    {showOrder &&
                    (isLoading ? 
                        <LoadingSpinner />
                    : ( errorMessage ? 
                            <ErrorMessage message={errorMessage} />
                        :
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <h2>Detalles de su pedido</h2>
                                    <p>Numero de pedido: {order.id}</p>
                                    <p>Fecha: {order.order_date}</p>
                                    <OrderDetailsTable order={order} />
                                    <p class="card-text">Para consultar otro pedido ingrese un token nuevamente.</p>
                                </li>
                            </ul>
                    ))}
            </div>
 */}
            
        </div>
    );
}
  
export default OrdersPage;