import React, { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    const login = async (credentials) => {
        try{
            //console.log(JSON.stringify(credentials));
            const response = await fetch(process.env.REACT_APP_API_URL + '_api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
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

    const logout = () => {
        // Lógica para cerrar sesión (llamada a la API, etc.)
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
