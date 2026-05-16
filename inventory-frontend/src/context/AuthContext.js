import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // initialize from localStorage so refresh doesn't reset auth
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? token : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user);
    }
  }, [user]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}