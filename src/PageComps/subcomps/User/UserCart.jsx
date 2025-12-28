import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../../Context/CarContext";
import Itemcart from "../SubCart/Itemcart";

function UserCart() {
    const { getCart, userid } = useCart();
      const [cart, setCart] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchCart = async () => {
          if (!userid) return; // wait until userid is available
          try {
            const fetchedCart = await getCart();
            setCart(fetchedCart || []); // fallback to empty array
          } catch (err) {
            console.error("Error fetching cart:", err);
            setCart([]);
          } finally {
            setLoading(false);
          }
        };
        fetchCart();
      }, [userid, getCart]);
    
      if (loading) {
        return <p>Loading cart...</p>;
      }
      const visibleCart  = JSON.parse(localStorage.getItem("cart"))
  return (
    <>
  {visibleCart?.length > 0 ? (
            visibleCart?.map(item => (
              <Itemcart
                key={item.product._id}
                URL={item.product.images?.[0]?.ImgUrl || ""}
                title={item.product.Title || "No title"}
                price={item.product.Price || 0}
                quant={item.quantity}
                id={item.product._id}
              />
            ))
          ) : (
            <div>
              <p>Cart is Empty...</p>
            </div>
          )}
          </>
)
}

export default UserCart