"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { AuthService } from "@/services/auth.service";

// ------------------------
// Types
// ------------------------
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface PaymentInfo {
  cardHolderName?: string;
  cardBrand?: string;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string | Address; // legacy string or structured object
  paymentInfo?: PaymentInfo;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

// ------------------------
// Context
// ------------------------
const UserContext = createContext<UserContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";

// ------------------------
// Provider
// ------------------------
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);

    if (typeof window !== "undefined") {
      (window as any).__authToken = null;
    }

    setUser(null);
  }, []);

  // Load user data from API
  const loadUserData = useCallback(
    async (userId: string) => {
      try {
        const response = await AuthService.getUser(userId);
        if (response.isSuccess && response.result) {
          setUser(response.result);
        } else {
          throw new Error(response.message || "Failed to load user data");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        logout();
        throw error;
      }
    },
    [logout]
  );

  // Initialize auth
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const userId = localStorage.getItem(USER_ID_KEY);

        if (token && userId) {
          if (typeof window !== "undefined") {
            (window as any).__authToken = token;
          }

          await loadUserData(userId);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [loadUserData]);

  // Login
  const login = useCallback(
    async (token: string, userId: string) => {
      try {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_ID_KEY, userId);

        if (typeof window !== "undefined") {
          (window as any).__authToken = token;
        }

        await loadUserData(userId);
      } catch (error) {
        console.error("Login failed:", error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        throw error;
      }
    },
    [loadUserData]
  );

  // Refresh user data
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

// ------------------------
// Hook
// ------------------------
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
