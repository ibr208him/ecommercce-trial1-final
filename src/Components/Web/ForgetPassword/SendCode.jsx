import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Input from "../../Shared/Input.jsx";
import "react-toastify/dist/ReactToastify.css";
import { sendCodeSchemaValidation } from "../Validate/SchemaValidation.js";
import { useNavigate } from 'react-router-dom';
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const initialValues = {
  email: "",
};

export default function Login() {

    const navigate=useNavigate();
  const onSubmit = async (user) => {
    console.log(user.email);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/auth/sendcode`,user);
    console.log(data);

    if (data.message == "success") {
   
      navigate("/setpassword"); 
    }
    

  };

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendCodeSchemaValidation,
  });
  const inputProps = [
    {
      type: "email",
      name: "email",
      id: "email",
      title: "User Email",
      onChange: formik.handleChange,
      value: formik.values.email,
    },
    
  ];

  return (
    <div className="container">
      <h2 className="mb-5">Reset Password</h2>
      <p className="text-danger fs-4">Once you click on Submit button,You will get a code in your email address entered below</p>
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
        <button type="submit" disabled={Object.keys(formik.errors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}
