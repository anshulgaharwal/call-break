import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi, getUser as getUserApi } from "../services/api";
import Login from "../pages/Login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
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

    const initAuth = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = await getUserApi();
            console.log(user);

            setUser(user);
        } else {
            setUser(null);
        }
        setLoading(false);
        setError(null);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        initAuth();
    }, []);

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
