import React, { createContext, useContext, useState, useEffect } from "react";

// TODO: Replace with proper User interface for MongoDB
interface User {
    uid: string;
    email: string | null;
    displayName?: string | null;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Check for JWT token in localStorage and validate with MongoDB API
        console.log("TODO: Implement JWT token validation");
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}