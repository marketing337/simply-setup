import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface ComplyUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  companyName?: string;
  gstin?: string;
  panNumber?: string;
  isVerified: boolean;
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ComplyAuthContextType {
  user: ComplyUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<ComplyUser>) => Promise<{ success: boolean; message: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  companyName?: string;
  gstin?: string;
  panNumber?: string;
}

const ComplyAuthContext = createContext<ComplyAuthContextType | null>(null);

export function useComplyAuth() {
  const context = useContext(ComplyAuthContext);
  if (!context) {
    throw new Error("useComplyAuth must be used within a ComplyAuthProvider");
  }
  return context;
}

export function ComplyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ComplyUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("comply_token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch("/api/comply/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem("comply_token");
        setToken(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("comply_token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/comply/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set token first, then user to trigger authentication state
        console.log("Login successful, setting auth state:", data.user);
        localStorage.setItem("comply_token", data.token);
        setToken(data.token);
        setUser(data.user);
        console.log("Auth state updated");
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/comply/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("comply_token", data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("comply_token");
  };

  const updateProfile = async (data: Partial<ComplyUser>): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/comply/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result.user);
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || "Profile update failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/comply/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || "Password change failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const isAuthenticated = !!user && !!token;

  return (
    <ComplyAuthContext.Provider 
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </ComplyAuthContext.Provider>
  );
}

export { ComplyAuthContext };
export type { ComplyUser, RegisterData };