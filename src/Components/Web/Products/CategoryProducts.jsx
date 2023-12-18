import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import './CategoryProducts.css'

export default function CategoryProducts() {
    const {id}=useParams('id');

    const getCategoryProducts=async()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`); 
        return(data);   
    }

const {data,isLoading}=useQuery('categoryProducts',getCategoryProducts);
console.log(data,'rtrtrtr'); // if you remove '?' ,error will happen as data took time to be received at the first time

if(isLoading){
  return <h2> loading.................</h2>
}
  return (
    <div className='container mt-5'>
      <div className='row g-5 text-center'>
{
        data.products.length>0?data.products.map((product,index)=>{
          return(
           
            <div className='col-lg-4' key={index}>
               <Link to={`/products/${product._id}`}>
              <h2 className='mb-5 text-black'>{product.name}</h2>          
              <div className='imgContainer w-75 h-75'>
              <img src={product.mainImage.secure_url} className='img-fluid'/>
              </div>
     
              </Link>
            </div>
          

          )
        })
        :
        <h2> no products for this category</h2>
      }
      </div>
    </div>
  )
}
