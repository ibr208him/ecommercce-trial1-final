
import React, { useState,useEffect } from 'react'
import Categories from ".././Categories/Categories.jsx";
import  axios  from 'axios';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';

export default function Products() {



let [noOfPages,setNoOfPages] =useState(0);
const [data,setData]=useState({});
const [loading,setLoading] = useState(true)
const [x,setX]=useState()
    const getProducts=async(i,state) => {

      setLoading(true);
      if(state=="next"){
         if(x<noOfPages){
        i=x+1;
      }
        else{
          i=x;
        }
      }
      else if(state=="previous"){
        if(x==1){
          i=x;
        }
          else{
            i=x-1;
          }
      }
      
       const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${i}&limit=4`);
        console.log(data,'kkkkkk');
         setData(data);
         if(data.message=='success'){
          setLoading(false);
          setX(i);
          setNoOfPages(data.total/data.page);
         }
    

    }


 console.log(data,'nnnnnnnnnnnn');
 console.log(noOfPages,'nooo of pagessssssss');
console.log(x,'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ');

useEffect(()=>{
  getProducts(1);
 
},[]);

if(loading) {
  return <h2>Loading.......</h2>
}
  return (
   <div className='products'>
    <div>
{
    data?.products.map((product)=>{
        return <h2>{product.name}</h2>
    })
    }
   </div>

<nav aria-label="Page navigation example">
    <ul className="pagination">
     <li className="page-item"><button className="page-link" onClick={()=>getProducts(1,"previous")} disabled={x==1?true:false}>Previous</button></li>
     {
     Array.from({ length: data.total/data.page }).map((_,index)=>{
     return <li className="page-item"><button className="page-link" onClick={()=>getProducts(index+1)}>{index+1}</button></li>
    })
  }
     <li className="page-item"><button className="page-link" onClick={()=>getProducts(1,"next")} disabled={x==noOfPages?true:false}>Next</button></li>
     </ul>
  
 </nav>
 </div>
  )
  }
