import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import Register from './Register';
import '../../../App.css'
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export default function AccountPage(){

    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <>
            {isAuthenticated ? (
                <div class="borderBottom text-center">
                    <h1>Usted esta navegando como usuario registrado</h1>
                    <button class="btn btn-primary" type="submit" onClick={logout}>Cerrar sesion</button>
                </div>
            ) : (
                <>
                    <div class="borderBottom text-center">
                        <h1>Usted esta navegando como visitante</h1>
                    </div>
                    <div className="loginAndRegisterContainer">
                        <Login/>
                        <Register/>
                    </div>
                </>
            )}
        </>
    );
}