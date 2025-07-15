// Basic authentication context for development - will be replaced with Firebase later
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "@/lib/db/mock-data";

// Create authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock login function
  const login = (email, password) => {
    // In a real app, this would validate against a backend
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        const user = mockUsers.find((user) => user.email === email);

        // In development, any password will work
        if (user) {
          setCurrentUser(user);
          localStorage.setItem("fishingApp_user", JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  };

  // Mock logout function
  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        localStorage.removeItem("fishingApp_user");
        resolve();
      }, 300);
    });
  };

  // Mock registration
  const register = (name, email, password, role = "user") => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = mockUsers.find((user) => user.email === email);

        if (existingUser) {
          reject(new Error("User already exists with this email"));
          return;
        }

        // Create a new user
        const newUser = {
          id: `u${mockUsers.length + 1}`,
          name,
          email,
          role,
          ...(role === "user" ? { reservations: [] } : { lakes: [] }),
        };

        // Add to mock data (in a real app, this would be a database call)
        mockUsers.push(newUser);

        // Log in the new user
        setCurrentUser(newUser);
        localStorage.setItem("fishingApp_user", JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("fishingApp_user");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Auth context value
  const value = {
    currentUser,
    login,
    logout,
    register,
    isAdmin: currentUser?.role === "admin",
    isAuthenticated: !!currentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
