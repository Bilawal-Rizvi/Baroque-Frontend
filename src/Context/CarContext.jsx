import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { TokenVerifier } from "./ValidateContext";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [userid, setUser] = useState('');
 useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?._id) {
    setUser(user._id); // state update
  }
}, []);


  const addProduct = useCallback(async (id,count) => {
    try {
      // console.log(user)
if (!userid) {
  alert("Please login first");
  return;
}
      const response = await axios.put(
        `${BASE_URL}/updateproduct/addproduct/${id}`,
        {
          userId: userid,
          count:count
        }
      );

      const updatedUser = response.data.resUser;

      if (updatedUser) {
        // 🔥 localStorage update
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      console.log("Updated User:", updatedUser);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  }, [userid]);
 const getCart = useCallback(async () => {
  if (!userid) return;
  try {
    const response = await axios.get(`${BASE_URL}/Get/getCart/${userid}`);
    // console.log(response.data.cart);
    const cart = response.data.cart;
    return cart
  } catch (err) {
    console.log(err.response?.data);
  }
}, [userid]);

  const RemoveProduct = useCallback(async (productid,count) => {
    try {
      // console.log(user)

      const response = await axios.delete(
        `${BASE_URL}/Remove/RemoveCart/${productid}`,{
      data:  {
          userId: userid,
          count:Number(count)
        }
      }
      );

      const updatedUser = response.data.resUser;

      if (updatedUser) {
        // 🔥 localStorage update
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      console.log("Updated User:", updatedUser);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  }, [userid]);
   const Removeitem = useCallback(async (productid,count) => {
    try {
      // console.log(user)

      const response = await axios.delete(
        `${BASE_URL}/Remove/Removeitem/${productid}`,{
      data:  {
          userId: userid,
        }
      }
      );

      const updatedUser = response.data.resUser;

      if (updatedUser) {
        // 🔥 localStorage update
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      // console.log("Updated User:", updatedUser);
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  }, [userid]);

  return (
    <CartContext.Provider
      value={{
        addProduct,
        getCart,
        userid,
        RemoveProduct,
        Removeitem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
