import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredUser, verifyToken } from "./auth";

interface User {
    uid: string;
    email: string | null;
    displayName?: string | null;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    loading: true,
    setUser: () => {} 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                // First check localStorage for user
                const storedUser = getStoredUser();
                if (storedUser) {
                    // Verify the token is still valid
                    const verifiedUser = await verifyToken();
                    if (verifiedUser) {
                        setUser(verifiedUser);
                    } else {
                        // Token invalid, clear stored user
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}