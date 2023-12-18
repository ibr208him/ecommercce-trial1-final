import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Input from "../../Shared/Input.jsx";
import "react-toastify/dist/ReactToastify.css";
import { LoginSchemaValidation } from "../Validate/SchemaValidation.js";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { userTokenContext,setUserTokenContext } = useContext(UserContext);
  const navigate = useNavigate();
  // if(userTokenContext){  // this method is to return the user back to the current page when he manually wrote login in the url but here the login page will appear for the moment before redirect back to the current page>>> better to use the Auth component
  //   navigate(-1);
  // }
  const onSubmit = async (user) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      user
    );
    console.log(data);

    if (data.message == "success") {
      localStorage.setItem("userToken", data.token);
      setUserTokenContext(data.token); // replacing saveCurrentUser()
      // saveCurrentUser(); // once we have the token, we need to call the function saveCurrentUser() to update the value of user in APP so that the user details can be sent to other components
      toast.success(
        "you have successfully logged in",
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
      navigate("/"); // to go to home page once the user is successfully logged in
    }
  };

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate:TraditionalValidate,
    validationSchema: LoginSchemaValidation,
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
  ];

  return (
    <div className="container">
      <h2 className="mb-5">Log In</h2>
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
        <button type="submit" disabled={Object.keys(formik.errors).length > 0} className="p-2">
          Log in
        </button>
        <div className="mt-4"> 
        <Link to='/sendcode'> Forget Password</Link>
        </div>

        
      </form>
    </div>
  );
}
