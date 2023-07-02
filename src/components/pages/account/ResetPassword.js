import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css';
import { AuthContext } from './AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner';

export default function ResetPassword() {
    let {token} = useParams();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const { resetPassword, isAuthLoading, handleToastShow } = useContext(AuthContext);

    const handleResetPassword = () => {
        if(!isPasswordValid){
            handleToastShow('Las contraseñas deben coincidir y tener al menos 4 caracteres');
        } else{
            const credentials = {
                token: token,
                password: password
            };
            resetPassword(credentials);
        }
    };

    useEffect(() => {
        setIsPasswordValid(password.length > 3 && password === passwordConfirmation);
    }, [password, passwordConfirmation]);

    return (
        <>
            <div className = "resetPasswprdPage">
                <div class="card" style={{ height: '275px' }}>
                    <h5 class="card-header">Recuperar contraseña</h5>
                    <div class="card-body">
                        {isAuthLoading ? 
                                <LoadingSpinner />
                            :
                                <>
                                    <input type="password" class="form-control mb-3" name="password" placeholder="Ingrese la contraseña que desee utilizar" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <input type="password" class="form-control mb-3" name="passwordConfirmation" placeholder="Confirme su contraseña" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                                    <button class="btn btn-primary" onClick={handleResetPassword} type="submit">Establecer contraseña</button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}