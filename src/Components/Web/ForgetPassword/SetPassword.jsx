import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Input from "../../Shared/Input.jsx";
import "react-toastify/dist/ReactToastify.css";
import { setPasswordSchemaValidation } from "../Validate/SchemaValidation.js";
import { useNavigate } from "react-router-dom";

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const initialValues = {
  email: "",
  password: "",
  code:"",
};

export default function SetPassword() {
  const navigate=useNavigate();
  const onSubmit = async (user) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user);
    console.log(data);

    if (data.message == "success") {

      toast.success(
        "you have successfully updated your password, please log in with the new password",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      navigate('/login'); 
    }

  };

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  const formik = useFormik({
    initialValues,
    onSubmit,

    validationSchema: setPasswordSchemaValidation,
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
    {
      type: "password",
      name: "password",
      id: "password",
      title: "User Password",
      onChange: formik.handleChange,
      value: formik.values.password,
    },
    {
      type: "text",
      name: "code",
      id: "code",
      title: "Code",
      onChange: formik.handleChange,
      value: formik.values.code,
    },

  ];

  return (
    <div className="container">
      <h2 className="mb-5">Set Password</h2>
      <p className="text-danger fs-4">Enter the code received in your email along with the new password</p>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {" "}
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
        {/* <button type='submit' disabled={Object.keys(formik.errors).length>0}>Register</button> */}
        {/* <button type='submit' disabled={!formik.isValid}>Register</button> */}
        {/* <input type='submit' disabled={!formik.isValid}/> */}
        <button type="submit" disabled={Object.keys(formik.errors).length > 0}>
         Submit
        </button>
     
      </form>
    </div>
  );
}
