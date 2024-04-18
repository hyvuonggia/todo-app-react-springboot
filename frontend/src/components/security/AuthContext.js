import { createContext, useContext, useState } from 'react';
import { apiClient } from '../../api/ApiClient';
import { executeJwtAuthenticationService } from '../../api/AuthenticationApiService';

// Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// share the created context with other components
const AuthProvider = ({ children }) => {
    // Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // const login = async (username, password) => {
    //     const basicToken = 'Basic ' + window.btoa(username + ':' + password);
    //     try {
    //         const response = await executeBasicAuthenticationService(
    //             basicToken,
    //         );
    //         if (response.status == 200) {
    //             setAuthenticated(true);
    //             setUsername(username);
    //             setToken(basicToken);

    //             apiClient.interceptors.request.use((config) => {
    //                 config.headers.Authorization = basicToken;
    //                 return config;
    //             });
    //             return true;
    //         } else {
    //             logout();
    //             return false;
    //         }
    //     } catch (error) {
    //         logout();
    //         return false;
    //     }
    // };

    const login = async (username, password) => {
        try {
            const response = await executeJwtAuthenticationService(
                username,
                password,
            );
            if (response.status == 200) {
                const jwtToken = 'Bearer ' + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);

                apiClient.interceptors.request.use((config) => {
                    config.headers.Authorization = jwtToken;
                    return config;
                });
                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    };

    const logout = () => {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, username, token }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
