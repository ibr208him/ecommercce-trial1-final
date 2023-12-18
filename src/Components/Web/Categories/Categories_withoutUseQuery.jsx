import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Categories() {
  const [isLoading,setLoading]=useState(true);
  const [categories,setCategories]=useState([]);

  const getCategories=async()=>{
    try{
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
  console.log(data);
  setCategories(data.categories);
  setLoading(false);
  }
  catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
}
  useEffect(() =>{
getCategories();

  })

  if(isLoading){
    return <h2>Loading..........</h2>
  }
  return (

  <div className='container'>
      <div className='row'>
  {
    categories.length>0?
categories.map((category,index)=>{
  return(
    
    <div className='col-lg-4'>
    <h2 key={index}>{category.name}</h2>
    <img src={category.image.secure_url} alt="category image" />
    </div>
  
  )
})
:
<h2>no categories found</h2>
}
  </div>
  </div>

  
  )
}
