// Thư viện context giúp chia sẻ dữ liệu giữa các component

import React, { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

/*
    Provider này chứa state cho người dùng tại session hiện tại
    Các function làm việc với cả client và server
*/
const AuthProvider = ({ children }) => {
    // dữ liệu user này được sử dụng trong session hiện tại của app
    // dữ liệu user trong session này sẽ bị xóa khi app bị kill
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const value = {
        user,
        loading,
        setUser,
        setLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook để dễ dàng sử dụng context trong component
const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export { AuthContext, AuthProvider, useAuth };
