import React, { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    const login = async (credentials) => {
        try{
            const response = await fetch(process.env.REACT_APP_API_URL + '_api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
            } else {
                window.alert('Credenciales invalidas.');
            }

        } catch (error) {
            console.log(error);
            window.alert('Error al iniciar sesion.');
        }

        // Lógica para iniciar sesión (llamada a la API, etc.)
    };

    const logout = async () => {
        // Lógica para cerrar sesión (llamada a la API, etc.)
        try{
            await fetch(process.env.REACT_APP_API_URL + '_api/logout', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            });

            localStorage.setItem('token', '');
            setIsAuthenticated(false);

        } catch (error) {
            console.log(error);
            window.alert('Error al cerrar sesion.');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
