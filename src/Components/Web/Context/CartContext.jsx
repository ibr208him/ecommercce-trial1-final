import { createContext } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export const CartContext = createContext(null);

// export function CartContextProvider(props){
// console.log(props); // it is an object ,has a property called children which is the component who has called the provider and it is a child of the provider

//     return <h2>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h2>;
// }

export function CartContextProvider({ children }) {
  const [count, setCount] = useState(0);
  const getCartContext = async () => {
    if (localStorage.getItem("userToken")) {
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart`,
          { headers: { Authorization: `Tariq__${token}` } }
        );
        //console.log(data, "getttttttttttttt");
        setCount(
          data.products.length == 0 ? 0 : data.products[0].quantity * data.count
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId: productId }, // the body (should be written before the headers)
        { headers: { Authorization: `Tariq__${token}` } } //the headers,,, see the documentation for authorization link why we add 'Tariq__'
      );
      if (data.message == "success") {
        toast.success("you have successfuly added the product to the cart!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setCount(count + 1);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCount(count - 1);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const clearCartContext = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {}, // important to send empty object with patch and post requests
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCount(0);
      getCartContext();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQtyCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId: productId },
        { headers: { Authorization: `Tariq__${token}` } } //the headers,,, see the documentation for authorization link why we add 'Tariq__'
      );
      setCount(count + 1);
      getCartContext();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQtyCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId: productId },
        { headers: { Authorization: `Tariq__${token}` } } //the headers,,, see the documentation for authorization link why we add 'Tariq__'
      );

      setCount(count - 1);
      getCartContext();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const createOrderContext = async (user) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        user,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      clearCartContext();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderContext = async () => {
    if (localStorage.getItem("userToken")) {
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/order`,
          { headers: { Authorization: `Tariq__${token}` } }
        );
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };




  /*----------------------------------------------------------------*/
  const getProductDetailsContext = async (id) => {
    try{
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      return data;
    }
    catch (error) {
      console.log(error);
    }
  }


  /*----------------------------------------------------------------*/

  return (
    <CartContext.Provider
      value={{
        addToCartContext,
        getCartContext,
        removeItemContext,
        count,
        setCount,
        clearCartContext,
        increaseQtyCartContext,
        decreaseQtyCartContext,
        createOrderContext,
        getOrderContext,
        getProductDetailsContext,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
