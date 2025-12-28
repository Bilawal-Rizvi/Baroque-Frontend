import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";
const ValidateContext = createContext();
export const ValidateProvider = ({ children }) => {
const BASE_URL = import.meta.env.VITE_BASE_URL;


  const Validator = useCallback(async (token) => {
    if (!token) {
      return {
        isValid: false,
        message: "No token provided",
      };
    }
    try {
      // console.log("Token Verifying...");
       const headers = {
      'Authorization': `Bearer ${token}`
    };
      const response = await axios.post(
        `${BASE_URL}/token/verify-Token`,
        {},
        {  headers }
      );
    //    console.log("🔍 Full response:", response); 
    // console.log("🔍 Response data:", response.data); 
    // console.log("🔍 Response user:", response.data.user);
      // console.log("Token Validated :", response.data);
      return {
        message: "Token Validated",
        isValid: true,
        user:response.data.user,
      };
    } catch (err) { // ✅ err use karo, error nahi
      console.error("❌ Token verification failed");
      console.error("❌ Status:", err.response?.status); // ✅ err.response
      console.error("❌ Data:", err.response?.data); // ✅ err.response
      console.error("❌ Message:", err.message); // ✅ err.message
      
      return {
        isValid: false,
        message: err.response?.data?.message || "Verification failed" // ✅ err
      };
    }
  }, []);

  const verifyAndSync = useCallback(async () => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    // console.log(storedToken)
    if (!storedToken || !storedUser) {
      return {
        isValid: false,
        message: "Not logged in",
      };
      return{
        success:true
      }
    }

    const result = await Validator(storedToken);

    if (!result.isValid) {
      // Invalid token - clear localStorage
      // console.log("🗑️ Clearing localStorage");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }

    return result;
  }, [Validator]);
return(
    
   <ValidateContext.Provider value={
    {
      Validator,
      verifyAndSync
    }
   }>
    {children }
   </ValidateContext.Provider>
  
)
};

export const TokenVerifier =()=>{
  const context = useContext(ValidateContext)
  if(!context){
    throw new Error("useTokenVerify must be used within TokenVerifyProvider");
  }
  return context;
}