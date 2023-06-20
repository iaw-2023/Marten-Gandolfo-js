import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css';
import { AuthContext } from './AuthProvider';
import React, { useContext, useEffect, useState } from 'react';

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const { register } = useContext(AuthContext);

    const handleRegister = () => {
        const credentials = {
            email: email,
            password: password
        };
        register(credentials);
    };
    
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsPasswordValid(password.length > 0 && password === passwordConfirmation);
    }, [password, passwordConfirmation]);

    return (
        <>
            <div className = "registerPage">
                <div class="card" style={{ height: '275px' }}>
                    <h5 class="card-header">Es nuevo aqui? Registrese</h5>
                    <div class="card-body">
                        <input type="text" class="form-control mb-3" name="username" placeholder="Ingrese aquí su correo" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input type="password" class="form-control mb-3" name="password" placeholder="Ingrese la contraseña que desee utilizar" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" class="form-control mb-3" name="passwordConfirmation" placeholder="Confirme su contraseña" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                        <button class="btn btn-primary" disabled={!isEmailValid || !isPasswordValid} onClick={handleRegister} type="submit">Registrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}