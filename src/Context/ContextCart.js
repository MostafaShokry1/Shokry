import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const contextCart = createContext();
export function ContextCartProvider({ children }) {
    const [emailToken, setEmailToken] = useState(null);

  const [countCart, setcountCart] = useState(0);
  async function getCart() {
    const res = await getUserLoggedCart();
    if (res?.status === 200) {
      console.log(res.data?.cart?.products?.reduce((sum, product) => sum + product.quantity, 0));
      setcountCart(res.data?.cart?.products?.reduce((sum, product) => sum + product.quantity, 0))
    }
  }
  useEffect(() => {
    getCart();
  }, []);
  const token = {
    token: `Bearer ${localStorage.getItem("userToken")}`,
  };
  const addtoCart = (id) => {
    return axios
      .post(
        "https://ecom-2suv.onrender.com/api/v1/cart/add",
        {
          product_id: id,
        },
        {
          headers: token,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };
  const getUserLoggedCart = () => {
    return axios
      .get("https://ecom-2suv.onrender.com/api/v1/cart", {
        headers: token,
      })
      .then((response) => response)
      .catch((error) => error);
  };
  const getUserLoggedOrder = () => {
    return axios
      .get("https://ecom-2suv.onrender.com/api/v1/orders", {
        headers: token,
      })
      .then((response) => response)
      .catch((error) => error);
  };
  const removeItem = (id) => {
    return axios
      .delete("https://ecom-2suv.onrender.com/api/v1/cart/remove", {
        headers: token,
        data: {
          product_id: id,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  };
  const updateItem = (id, count) => {
    return axios
      .put(
        "https://ecom-2suv.onrender.com/api/v1/cart/update",
        {
          product_id: id,
          count,
        },
        {
          headers: token,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };
  const onlinePayment = (data) => {
    return axios
      .post(
        "https://ecom-2suv.onrender.com/api/v1/orders/card?url=http://localhost:3000/",
        data,
        {
          headers: token,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };
  const offlinePayment = (data) => {
    return axios
      .post(
        "https://ecom-2suv.onrender.com/api/v1/orders/cash",
        data,
        {
          headers: token,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };
  return (
    <contextCart.Provider
      value={{
        setEmailToken,
        getUserLoggedOrder,
        emailToken,
        getCart,
        countCart,
        setcountCart,
        addtoCart,
        getUserLoggedCart,
        removeItem,
        updateItem,
        onlinePayment,
        offlinePayment
      }}
    >
      {children}
    </contextCart.Provider>
  );
}
