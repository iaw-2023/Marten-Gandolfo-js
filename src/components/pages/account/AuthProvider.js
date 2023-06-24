import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const navigate = useNavigate();

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
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
            } else {
                window.alert('Credenciales invalidas.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            console.log(error);
            window.alert('Error al iniciar sesion.');
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
            console.log(error);
            window.alert('Error al cerrar sesion.');
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
                setIsAuthenticated(true);
            } else {
                window.alert('El email ya esta siendo utilizado.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            console.log(error);
            window.alert('Error al registrarse.');
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
                window.alert('Se enviará un correo a su email para recuperar su contraseña.');
            } else {
                window.alert('Error al solicitar recuperación de contraseña.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            window.alert('Error al solicitar recuperación de contraseña.');
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
                window.alert('Contraseña reestablecida.');
            } else {
                window.alert('Error al recuperar contraseña.');
            }

        } catch (error) {
            setIsAuthLoading(false);
            console.log(error);
            window.alert('Error al recuperar contraseña.');
        }
    }

    useEffect(() => {
        if(!isAuthenticated)
            localStorage.setItem('token', '');
    }, [isAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, register, requestPasswordReset, resetPassword, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
