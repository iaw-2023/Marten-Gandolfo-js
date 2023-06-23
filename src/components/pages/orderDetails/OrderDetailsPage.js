import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';
import OrderDetailsTable from '../orders/OrderDetailsTable';
import { AuthContext } from '../account/AuthProvider';
import Login from '../account/Login';
import Register from '../account/Register';

export default function OrderDetailsPage(){
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const fetchOrder = () => {
        if(isAuthenticated)
            fetch(process.env.REACT_APP_API_URL + '_api/orders/' + id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then(response => {
                    if(response.status == 401){
                        setErrorMessage('Error de sesión');
                        setIsAuthenticated(false);
                        throw new Error('Error de sesión');
                    }
                    if(!response.ok)  throw new Error('Error al cargar el pedido');
                    return response.json();
                })
                .then(data => {
                    setOrder(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage(error.message);
                });
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        fetchOrder()
    }, [isAuthenticated]);

    return (
        <div>
            <div class="borderBottom text-center">
                <img src="/shopping_bag.png" width="200px" alt="..."/>
                <h1>Detalle de Pedido</h1>
            </div>
            {isAuthenticated ? (
                isLoading ? 
                    <LoadingSpinner />
                :
                    errorMessage ?
                        <ErrorMessage errorMessage={errorMessage} />
                    :
                        <OrderDetailsTable order={order} />
                )
            :
                <div>
                    <h3 class="m-4">Inicie sesión para ver su pedidos</h3>
                    <Login />
                    <Register />
                </div>
            }
        </div>
    );
}