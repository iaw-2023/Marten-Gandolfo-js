import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import OrdersTable from './OrdersTable';
import OrderDetailsTable from './OrderDetailsTable';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from '../account/AuthProvider';
import Login from '../account/Login';
import Register from '../account/Register';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const fetchOrders = () => {
        if(isAuthenticated)
            fetch(process.env.REACT_APP_API_URL + '_api/orders', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then(response => {
                    if(response.status == 401){
                        setErrorMessage('Error de sesión');
                        setIsAuthenticated(false);
                        return ;
                    }
                    if(!response.ok){setErrorMessage('Error al cargar los pedidos'); return ;}
                    return response.json();
                })
                .then(data => {
                    setOrders(data.orders);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage('Error al cargar los pedidos');
                });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [isAuthenticated])

    

    return (
        <div>
            <div class="borderBottom text-center">
                <h1>Pedidos</h1>
                <img src="/shopping_bag.png" width="200px" alt="..."/>
            </div>
            {isAuthenticated ? (
                isLoading ? 
                    <LoadingSpinner />
                :
                    errorMessage ?
                        <ErrorMessage errorMessage={errorMessage} />
                    :
                        orders.length === 0 ?
                            <>
                                <h3 class="text-center">Todavía no hay nada por acá</h3>
                                <div class="text-center">
                                    <p>No sabes que comprar? Comprate todo!</p>
                                    <Link type="button" to="/products" class="btn btn-primary btn-sm">Ver productos</Link>
                                </div>
                            </>
                        :
                            <OrdersTable orders={orders} />
                )
            :
                <div>
                    <h3 class="m-4">Inicie sesión para ver sus pedidos</h3>
                    <div className="loginAndRegisterContainer">
                        <Login/>
                        <Register/>
                    </div>
                </div>
            }
            
            
        </div>
    );
}
  
export default OrdersPage;