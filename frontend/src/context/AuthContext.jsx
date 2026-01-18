import { createContext, useContext, useState } from "react";
import { login as loginApi, register as registerApi } from "../services/api";
import Login from "../pages/Login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginApi(email, password);
            setUser(response.user);
            localStorage.setItem("token", response.token);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerApi(name, username, email, password);
            setUser(response.user);
            localStorage.setItem("token", response.token);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                loading,
                error,
                logout,
            }}
        >   
            {
             user ? children : <Login />
            }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
