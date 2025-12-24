"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AuthService } from "@/services/auth.service";

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const logout = useCallback(() => {
    // Clear tokens
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    
    // Clear token from http service
    if (typeof window !== "undefined") {
      (window as any).__authToken = null;
    }

    // Clear user data
    setUser(null);
  }, []);

  // Load user data from API
  const loadUserData = useCallback(async (userId: string) => {
    try {
      const response = await AuthService.getUser(userId);
      if (response.isSuccess && response.result) {
        setUser(response.result);
      } else {
        throw new Error(response.message || "Failed to load user data");
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      // If loading user fails, clear tokens and logout
      logout();
      throw error;
    }
  }, [logout]);

  // Initialize: Check for existing token and load user data
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const userId = localStorage.getItem(USER_ID_KEY);

        if (token && userId) {
          // Set token in http service
          if (typeof window !== "undefined") {
            (window as any).__authToken = token;
          }
          
          // Load user data
          await loadUserData(userId);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // Clear invalid tokens
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [loadUserData]);

  const login = useCallback(async (token: string, userId: string) => {
    try {
      // Store tokens
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_ID_KEY, userId);
      
      // Set token in http service
      if (typeof window !== "undefined") {
        (window as any).__authToken = token;
      }

      // Load user data
      await loadUserData(userId);
    } catch (error) {
      console.error("Login failed:", error);
      // Clear tokens on error
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      throw error;
    }
  }, [loadUserData]);

  const refreshUserData = useCallback(async () => {
    const userId = localStorage.getItem(USER_ID_KEY);
    if (userId) {
      await loadUserData(userId);
    }
  }, [loadUserData]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

