
import React, { useState,useEffect } from 'react'
import './products.css'
import  axios  from 'axios';

import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ProductShow() {

  // let [noOfPages,setNoOfPages] =useState(0);

  const [data,setData]=useState({});

  const [loading,setLoading] = useState(true);
  const {id}=useParams('id');
  console.log(id);
const navigate=useNavigate();

const getProducts_next=(e)=>{
    if(id<data.total/data.page){
       console.log(id,'nexxxt');
 
      navigate(`/products/page/${id-(-1)}`);     
     
 }

   else{
     e.preventDefault();
   }
}

const getProducts_previous=(e)=>{
  
    if(id==1){
      e.preventDefault();
          
 }

   else{
    navigate(`/products/page/${id-1}`); 
   }
}

    const getProducts=async(pageID) => {
      setLoading(true);

       const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${pageID}&limit=4`);
       console.log(data,'kkkkkk');
         setData(data);
         if(data?.message=='success'){
          setLoading(false);
          // setNoOfPages(data.total/data.page);
         }
    }

  
useEffect(()=>{
  console.log(id);
  getProducts(id);
 
},[id]);

if(loading) {
  return <h2>Loading.......</h2>
}

  return (
//    <div className='products'>
//     <div>
// {
//     data?.products.map((product)=>{
//         return <h2>{product.name}</h2>
//     })
//     }
//    </div>
<div className='container mt-5'>
<div className='row text-center row-gap-5'>
{
  data.products.length>0?data.products.map((product,index)=>{
    return(
     
      <div className='col-lg-6 product-itemm vh-100 ' key={index}>
        <h2 className='mb-5 text-black fs-6'>{product.name}</h2>          
        <div className='imgContainerr'>
        <img src={product.mainImage.secure_url} className='h-100'/>
        
        </div>
        <div className='details d-flex text-align-center justify-content-center mt-3'>
          <Link className='product-details'  to={`/products/${product._id}`}>details</Link>
        </div>

    
      </div>
    

    )
  })
  :
  <h2> no products for this category</h2>
}
</div>

<nav className='text-center m-auto d-flex justify-content-center mt-3'>
    <ul className="pagination m-auto">
    <li className="page-item"><Link className="page-link"  style={{pointerEvents: id == 1 ? 'none' : ''}}onClick={(e)=>getProducts_previous(e)}>Previous</Link></li>
     {
     Array.from({ length: data?.total/data?.page }).map((_,index)=>{
     return <li className="page-item" key={index}><Link className="page-link" to={`/products/page/${index+1}`}>{index+1}</Link></li>
   
    })
  }
     <li className="page-item"><Link className="page-link" style={{pointerEvents: id == data?.total/data?.page ? 'none' : ''}} onClick={(e)=>getProducts_next(e)}>Next</Link></li>
     </ul>
  
 </nav>
 </div>

  )
  }































