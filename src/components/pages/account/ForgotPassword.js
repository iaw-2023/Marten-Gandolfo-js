import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css';
import { AuthContext } from './AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner';

export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const { requestPasswordReset, isAuthLoading } = useContext(AuthContext);

    const handleRequestPasswordReset = () => {
        if(!isEmailValid){
            window.alert('El email es inválido');
        } else{
            requestPasswordReset(email);
        }
    };
    
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    return (
        <>
            <div className = "forgotPasswordPage">
                <div class="card">
                    <h5 class="card-header">Solicitar recuperar contraseña</h5>
                    <div class="card-body">
                        {isAuthLoading ? 
                                <LoadingSpinner />
                            :
                                <>
                                    <input type="text" class="form-control mb-3" name="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese aquí su correo"></input>
                                    <button class="btn btn-primary" type="submit" onClick={handleRequestPasswordReset}>Solicitar recuperar contraseña</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}