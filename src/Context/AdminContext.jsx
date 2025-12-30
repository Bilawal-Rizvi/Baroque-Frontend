import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCallback } from "react";
import { useAuth } from "./Authcontext";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("accessToken");
 const {user} = useAuth()
  const [Data, setData] = useState({
    PendingOrder: 0,
    CompletedOrder: 0,
    TotalOrders: 0,
    TotalProducts: 0,
  });
  const [Orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const GetData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/totaldata`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err.response.message);
    }
  }, [token]);

  const GetOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/Orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(response.data.Orders);
      // console.log(response.data.Orders);
    } catch (err) {
      console.log(err.response.message);
    }
  }, []);
  const SingleOrder = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/single/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data.singleorder)
      return response.data.singleorder;
      // console.log(response.data.Orders);
    } catch (err) {
      console.log(err.response.message);
    }
  }, []);
  const UpdateStatus = useCallback(
    async (id) => {
      if (!token) return; // token missing, avoid request
      try {
        const response = await axios.put(
          `${BASE_URL}/admin/update/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(response.data.message);
        return response.data.update; // backend me 'update' property hai
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    },
    [token]
  );
  const GetProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/GetProducts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data.Data);
      return response.data.Data;
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }, []);
  const DelProducts = useCallback(async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/delProduct/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data.message)
      return response.data.DeletedProduct;
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  }, []);
  const UpdateProduct = useCallback(async (id, data) => {
    try {
      const Formdata = new FormData();
      Formdata.append("Title", data.Title);
      Formdata.append("Price", data.Price);
      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => Formdata.append("images", file));
      }
      const res = await axios.put(
        `${BASE_URL}/admin/UpdateProduct/${id}`,
        Formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
      return true;  
    } catch (err) {
      console.log(err.response?.data?.message);
      return false
    }
  }, []);

  const AddProduct = async (data) => {
    try {
      const Formdata = new FormData();
      Formdata.append("Title", data.Title);
      Formdata.append("Price", data.Price);
      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => Formdata.append("images", file));
      }
      const res = await axios.post(
        `${BASE_URL}/upload/upload-product`,
        Formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data);
    } catch (err) {
     console.log(err.response?.data?.message);
     return err.response?.data?.message;
    }
  };
 useEffect(() => {
  if (!user || user.role !== "admin") return; // non-admin ko skip

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await GetOrders();
      setOrders(orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [user]);
  useEffect(() => {
    if (token) {
      GetData();
    }
  }, [GetData, token]);
  return (
    <AdminContext.Provider
      value={{
        GetData,
        Data,
        Orders,
        loading,
        UpdateStatus,
        SingleOrder,
        GetProducts,
        DelProducts,
        UpdateProduct,
        AddProduct
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
