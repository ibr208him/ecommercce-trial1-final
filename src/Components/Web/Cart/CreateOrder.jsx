import { React, useContext } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../Context/CartContext.jsx";
import { createOrderSchemaValidation } from "../Validate/SchemaValidation.js";
import { useFormik } from "formik";
import "./Cart.css";
import Input from "../../Shared/Input.jsx";
import axios from "axios";
const initialValues = {
  couponName: "",
  address: "",
  phone: "",
};

export default function CreateOrder() {


  const navigate = useNavigate();
  const {createOrderContext}=useContext(CartContext);
  const onSubmit = async (user) => {
  let res=await createOrderContext(user);
console.log(res,'response or order');
    if (res.message == "success") {
      toast.success("We have successfully received your order", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/profile/getorder");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createOrderSchemaValidation,
  });

  const inputProps = [
    {
      type: "text",
      name: "couponName",
      id: "couponName",
      title: "Coupon Name",
      onChange: formik.handleChange,
      value: formik.values.email,
    },
    {
      type: "text",
      name: "address",
      id: "address",
      title: "Address",
      onChange: formik.handleChange,
      value: formik.values.password,
    },
    {
      type: "text",
      name: "phone",
      id: "phone",
      title: "phone",
      onChange: formik.handleChange,
      value: formik.values.password,
    },
  ];

  let { count, setCount } = useContext(CartContext);
  const { getCartContext } = useContext(CartContext);
  const getCartContent = async () => {
    const res = await getCartContext(); // we put the function getCartContext in async function because it is also sync function return a promise
    return res;
  };

  const { data, isLoading } = useQuery("cart", getCartContent);
  console.log(data, "caaaaaaaaaaart");

  if (isLoading) {
    return <h2>Loading.......... </h2>;
  }



const calcSubtotal=()=>{
  console.log(data.products,'productsssssss');
  let sum=0;
  data?.products ?(
    data?.products.forEach((product) => {
      sum=sum+(product.details.finalPrice * product.quantity);  
}) 
  )
  :sum=0;
return sum;
};

  console.log(calcSubtotal());



  return (
    <div className="cart">
      <div className="container">
        <div className="row">
          <div className="cart-items">
            <div className="products w-75" id="products">
              <div className="item">
                <div className="product-info">
                  <h2>Product</h2>
                </div>
                <div className="quantity">
                  <h2>Quantity</h2>
                </div>
                <div className="price">
                  <h2>Price</h2>
                </div>
                <div className="subtotal">
                  <h2>Subtotal</h2>
                </div>
              </div>

              {data?.products ? (
                data?.products.map((product) => {
                  return (
                    <div className="item" key={product.details._id}>
                      <div className="product-info">
                        <img src={product.details.mainImage.secure_url} />
                        <div className="product-details">
                          <h2>{product.details.name}</h2>
                          <span>Color:black</span>
                        </div>
                      </div>
                      <div className="quantity">
                        <span>{product.quantity}</span>
                      </div>
                      <div className="price">{product.details.finalPrice}</div>
                      <div className="subtotal">
                        {product.details.finalPrice * product.quantity}
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2> Cart is empty ...</h2>
              )}
            </div>

            <div className="cart-summary">
              <h2>Required Information</h2>
              <div className="summery-items">
                <div className="summary-item py-3">
                  <div className="d-flex flex-column row-gap-3 w-100">
                    <form onSubmit={formik.handleSubmit}>
                      {inputProps.map((inputProp, index) => {
                        return (
                          <Input
                            type={inputProp.type}
                            name={inputProp.name}
                            id={inputProp.id}
                            title={inputProp.title}
                            key={index}
                            value={inputProp.value}
                            onChange={inputProp.onChange}
                            errors={formik.errors}
                            touched={formik.touched}
                            onBlur={formik.handleBlur}
                          />
                        );
                      })}
                      <div className="summary-footer">
                        <label>Subtotal</label>
                        <span>${calcSubtotal()}</span>
                      </div>
                      <div className="summary-footer">
                        <label className="total">Total</label>
                        <span>${calcSubtotal()}</span>
                      </div>
                      <button
                        className="p-2 bg-danger text-white fs-4 w-100 mt-5"
                        onClick={() => navigate("/cart")}
                      >
                     
                        Edit order
                      </button>
                      <button
                        type="submit"
                        disabled={Object.keys(formik.errors).length > 0?true:false}
                        className="p-2 bg-success text-white fs-4 w-100 mt-3"
                
                      >
                        Make Order
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
