import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Input from '../../Shared/Input.jsx'
import {RegisterSchemaValidation} from '../Validate/SchemaValidation.js';
import TraditionalValidate from'../Validate/TraditionalValidate.js'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const     initialValues={ 
  userName:'', // same attribute name and name given by API documentation
  email:'',
  password:'',
  image:'',
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
export default function Register() {
  const navigate=useNavigate(); // should be inside the component function and not insdie any subfunctions

  const onSubmit=async user=>{
    const formData=new FormData();
  //The append() method of the FormData interface appends a new value onto an existing key inside
   //a FormData object,or adds the key if it does not already exist.
  // formData.userName=user.userName is not allowed here
    formData.append('userName', user.userName); 
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);
    console.log(formData);
    const {data}=await axios.post("https://ecommerce-node4.vercel.app/auth/signup",formData);
    console.log(data);
    if(data.message=='success'){
      toast.success('you are successfuly regestered,please confirm your email', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      navigate('/login');
      }
      
  }
  let [imagetrigger,setImageTrigger]=useState(false); // to be used to disable the submit button when the user didn't upload image
  const formik=useFormik({
    initialValues,
    onSubmit,
    //validate:TraditionalValidate,
    validationSchema:RegisterSchemaValidation, // console.log(formik), you will find a property call formik.errors has all the errros of validation
  });
  const handleFieldChange = event=>{
    console.log(event);
    formik.setFieldValue('image', event.target.files[0]);
    if(event.target.files[0]){
    setImageTrigger(true);// to be used to disable the submit button when the user didn't upload image
    }
  }
  const inputProps=[
    {
      type:'text',
      name:'userName',
      id:'userName',
      title:'Username',
      onChange:formik.handleChange,
      value:formik.values.userName
    },
    {
      type:'email',
      name:'email',
      id:'email',
      title:'User Email',
      onChange:formik.handleChange,
      value:formik.values.email
    },
    {
      type:'password',
      name:'password',
      id:'password',
      title:'User Password',
      onChange:formik.handleChange,
      value:formik.values.password
    },
    {
      type:'file', // type of input is file for images
      name:'image',
      id:'image ',
      title:'User Image',
      onChange:handleFieldChange, // we shouldn't use formik.handleChange when sending files
     // for files, no need to send the value attribute
    },
  
  ]


  return (
    <div className='container'>
      <h2 className='mb-5'>Register</h2>
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
 {
  inputProps.map((inputProp,index)=>{
    return (
     
      <Input type={inputProp.type}
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
    )
    })
  }

    {/* <button type='submit' disabled={Object.keys(formik.errors).length>0}>Register</button> */}
    {/* <button type='submit' disabled={!formik.isValid}>Register</button> */}
    {/* <input type='submit' disabled={!formik.isValid}/> */}
    <button type='submit' disabled={Object.keys(formik.errors).length>0 || !imagetrigger}>Register</button> 

  </form>
  </div>
  )
}
