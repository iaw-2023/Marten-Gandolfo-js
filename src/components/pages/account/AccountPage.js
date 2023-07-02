import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import Register from './Register';
import '../../../App.css'
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import LoadingSpinner from '../../LoadingSpinner';

export default function AccountPage(){

    const { isAuthenticated, logout, isAuthLoading } = useContext(AuthContext);

    return (
        <>
            <div class="borderBottom text-center">
                <h1>Usted esta navegando como {isAuthenticated ? 'usuario registrado' : 'invitado'}</h1>
            </div>
            {
                isAuthenticated ? (
                    isAuthLoading ? 
                        <LoadingSpinner />
                    :
                        <div class="text-center">
                            <button class="btn btn-primary" type="submit" onClick={logout}>Cerrar sesion</button>
                        </div>
                ) : (
                    <div className="loginAndRegisterContainer">
                        <Login/>
                        <Register/>
                    </div>
                )
            }
        </>
    );
}