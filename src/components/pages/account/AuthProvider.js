import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ToastComponent from '../../ToastComponent';
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const handleToastShow = (message) => {
      setToastMessage(message);
      const toastElement = document.getElementById('authToast');
      const toast = new Toast(toastElement);
      toast.show();
    };

    const login = async (credentials) => {
        try{
            setIsAuthLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL + '_api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            setIsAuthLoading(false);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_email',credentials['email']);
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
            } else {
                handleToastShow('Credenciales invalidas.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            handleToastShow('Error al iniciar sesion.');
        }
    };

    const logout = async () => {
        try{
            setIsAuthLoading(true);
            await fetch(process.env.REACT_APP_API_URL + '_api/logout', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            });
            setIsAuthLoading(false);

            setIsAuthenticated(false);

        } catch (error) {
            setIsAuthLoading(false);
            handleToastShow('Error al cerrar sesion.');
        }
    };

    const register = async (credentials) => {
        try{
            setIsAuthLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL + '_api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            setIsAuthLoading(false);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                handleToastShow('Se ha registrado exitosamente.');
                setIsAuthenticated(true);
            } else {
                handleToastShow('El email ya esta siendo utilizado.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            handleToastShow('Error al registrarse.');
        }
    }

    const requestPasswordReset = async (email) => {
        try{
            setIsAuthLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL + '_api/requestpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email}),
            });
            setIsAuthLoading(false);

            if (response.ok) {
                const data = await response.json();
                handleToastShow('Se enviará un correo a su email para recuperar su contraseña.');
            } else {
                handleToastShow('Error al solicitar recuperación de contraseña.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            handleToastShow('Error al solicitar recuperación de contraseña.');
        }
    }

    const resetPassword = async (credentials) => {
        try{
            setIsAuthLoading(true);
            const response = await fetch(process.env.REACT_APP_API_URL + '_api/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            setIsAuthLoading(false);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/');
                handleToastShow('Contraseña reestablecida.');
            } else {
                handleToastShow('Error al recuperar contraseña.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            handleToastShow('Error al recuperar contraseña.');
        }
    }

    useEffect(() => {
        if(!isAuthenticated)
            localStorage.setItem('token', '');
    }, [isAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, register, requestPasswordReset, resetPassword, isAuthLoading, handleToastShow }}>
            {children}
            <ToastComponent id={'authToast'} toastTitle={'Master Gaming.'} toastBody={toastMessage} ></ToastComponent>
        </AuthContext.Provider>
    );
};
