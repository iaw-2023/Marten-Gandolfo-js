import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css';
import { AuthContext } from './AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const { login, isAuthLoading, handleToastShow } = useContext(AuthContext);

    const handleLogin = () => {
        if(!isEmailValid){
            handleToastShow('El email es inválido');
        } else if(!isPasswordValid){
            handleToastShow('La contraseña debe tener al menos 4 caracteres');
        } else{
            const credentials = {
                email: email,
                password: password
            };
            login(credentials);
        }
    };
    
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsPasswordValid(password.length > 3);
    }, [password]);

    return (
        <>
            <div className = "loginPage">
                <div class="card" style={{ height: '275px' }}>
                    <h5 class="card-header">Iniciar sesion</h5>
                    <div class="card-body">
                        {isAuthLoading ? 
                            <LoadingSpinner />
                        :
                            <>
                                <input type="text" class="form-control mb-3" name="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese aquí su correo"></input>
                                <input type="password" class="form-control mb-3" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese aquí su contraseña"/>
                                <button class="btn btn-primary" type="submit" onClick={handleLogin}>Login</button>
                                <div class="mb-3"></div>
                                <Link to={'/forgotpassword'}>¿Olvido su contraseña?</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}