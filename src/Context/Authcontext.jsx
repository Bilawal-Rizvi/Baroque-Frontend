import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Initial loading true

  // ---------- LOGIN FUNCTION ----------
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/login/mainlogin`, {
        email,
        password,
      },{ withCredentials: true });
      console.log("Login response:", res.data);

      const { accessToken, user } = res.data;
      // console.log(accessToken)
      // ✅ State update
      setToken(accessToken);
      setUser(user);
      
      // ✅ localStorage update
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      
      // console.log("User set in context:", user); // Debug
      
      return { success: true,
        user:user
       };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Load from localStorage on mount
  useEffect(() => {
    // console.log("AuthContext mounting, checking localStorage..."); // Debug
    
    try {
      const storedToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");
          //  console.log("Stored user:", storedUser);
      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // console.log("Found user in localStorage:", parsedUser); // Debug
        
        setToken(storedToken);
        setUser(parsedUser);
   
      } else {
        // console.log("No user found in localStorage"); // Debug
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false); // ✅ Always set loading to false
      // console.log("AuthContext loading complete"); // Debug
    }
  }, []);

  // ---------- LOGOUT FUNCTION ----------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  // ✅ Debug: Log whenever user changes
  // useEffect(() => {
  //   console.log("AuthContext user changed:", user);
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading, // ✅ Make sure loading is exposed
        login,
        logout,
        setToken, // Optional
        setUser,  // Optional
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};