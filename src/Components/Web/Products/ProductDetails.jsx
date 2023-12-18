import {React,useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
import './ProductDetails.css'
import { CartContext } from '../Context/CartContext.jsx'
import Input from "../../Shared/Input.jsx";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext.jsx";
import { createReviewSchemaValidation } from "../Validate/SchemaValidation.js";


export default function ProductDetails() {
  let sum=0;
  let avg;
  const { id } = useParams("id");
  const[loading,setLoading]=useState(true);
  const getProductDetails = async () => {
    const {data} = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
if(data.message=="success"){
  
  setLoading(false);

}
    return data;
  };

  const { data, isLoading } = useQuery("ProductDetails", getProductDetails);
  console.log(data, "rtrtrtr");

const {addToCartContext}=useContext(CartContext);
  const addToCart=async (productId)=>{
    const res=await addToCartContext(productId);
    console.log(res);
  }



const getReviewRating=()=>{
  data?.product.reviews.forEach((review)=>{
     sum+=review.rating;
  })
  return  (Math.round((sum/data?.product.reviews.length)*2)/2);        
}
avg=getReviewRating();

  const getDateAndTime = (timestamp)=>{
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const newDate=`${day}-${month}-${year}`                 
  const newTime=`${hours>12?hours-12:hours==0?12:hours}:${minutes}:${seconds} ${hours<12?'AM':'PM'}`
  return ({newDate ,newTime })
  }
console.log(getDateAndTime("2023-12-13T21:17:14.769Z").newDate);




/***************************************************************************** */
//const { data:data2, isLoading:isLoading2 } = useQuery("ProductDetails", getProductDetails);
 let idd=data?.product._id;
 console.log(idd,'idddddddddddddddddddddd');
const initialValues = {
  comment: "",
  rating: ""
};
let [errmessage,setErrMessage]=useState('');
const onSubmit = async (user) => {
  try{
  const token = localStorage.getItem("userToken");
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/products/${idd}/review`,
    {
      comment:user.comment,
      rating:user.rating
    },
    { headers: { Authorization: `Tariq__${token}` } }
  );
  console.log(data,'commmentttttttttttttttttttttttttttttt');

  if (data.message == "success") {

    toast.success(
      "you have successfully submitted your comment",
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
 
  }
}
catch (e) {
  setErrMessage(`we are sorry........ ${e.response.data.message}`);
  // alert(e.response.data.message);
  // console(e.response.data.message,'errrrrrrrrrrrrrrrrrr');
}
};
const formik = useFormik({
  initialValues,
  onSubmit,
   validationSchema: createReviewSchemaValidation,
});

const inputProps = [
  {
    type: "text",
    name: "comment",
    id: "comment",
    title: "Type your comment",
    onChange: formik.handleChange,
    value: formik.values.email,
  },
  {
    type: "text",
    name: "rating",
    id: "rating",
    title: "Type your rating",
    onChange: formik.handleChange,
    value: formik.values.email,
  },
];










/********************************************************************************* */






  if (loading) {
    return <h2> loading.................</h2>;
  }
  return (
    <div className="container mt-5 ">
      <div className=" bg-success p-5 d-flex column-gap-5 ">
      <div className="subImages d-flex flex-column row-gap-5">
        {data?.product.subImages.map((subImage, index) => {
          return (
            <div className="subImageContainer" key={index}>
              <img src={subImage.secure_url} className="w-100 h-100" />
            </div>
          );
        })}
      </div>
      <div className="product-details-content ps-5 d-flex flex-column row-gap-5">
        <div className="product-info">
        <h2 className="mb-5 fs-1">{data?.product.name}</h2>
        {/* <h2 className="mb-5 fs-1">{data?.product._id}</h2> */}
        <div className="avg-rating mb-3 d-flex align-items-center bg-white p-3">
        <span className="fs-4 me-3 ">Avg Rating: </span>
        <>
              {
               
                ((Math.round(avg))-0.5)==(avg)?
                
                Array.from({ length: avg+0.5 }).map((_,index)=>{
                  return (
                  
                  index==avg-0.5?<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/></svg>

                 :
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                      )              
                     })
                
                  

                 :
                 Array.from({ length: avg}).map((_,index)=>{
                 return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

                 })

                
              }
              {
               avg<4.5?
               Array.from({ length:Math.round(5-avg-0.5)}).map((_,index)=>{
                return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#4b4949" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

                })
                :
             ''
              }
               </>
          
               </div>   
        <p className="mb-5 fs-5">{data?.product.description}</p>

        {/* <div className="imgContainer w-50 h-50 me-auto">
        <img src={data.product.mainImage.secure_url} className="img-fluid" />
        </div> */}

        <p className="my-5 fw-bold fs-2">
          Final Price: {data?.product.finalPrice}
        </p>
        <button className='btn btn-danger w-50 p-2 fs-5' onClick={()=>addToCart(data?.product._id)}> Add to Cart</button>
        </div>

        <div className='product-reviews'>


          <h2>Reviews</h2>

        {data?.product.reviews.map((review, index) => {
          return (
            <div className="review bg-white p-5" key={index}>
              <h4 className="">Comment {index+1}</h4>
              <div className="review-content d-flex align-items-center justify-content-between ">

              <div className="commenter-info d-flex column-gap-5">
                <div className="commenter-image ">
                  <img src={review.createdBy.image.secure_url} className="w-100 h-100"/>
                </div>
                <div className="commenter-contact-details">
                <p>{review.createdBy.userName}</p>
                <p>{review.createdBy.email}</p>
                <p>{getDateAndTime(review.createdAt).newDate}</p>
                <p>{getDateAndTime(review.createdAt).newTime}</p>
                </div>
              </div>
              <div className="comment-with-rating me-5">
               <div className="single-rating-details mb-3 d-flex align-items-center justify-content-end">
             
              <div className="single-review-rating">
              {
               
                ((Math.round((Math.round(review.rating*2)/2)))-0.5)==(Math.round(review.rating*2)/2)?
                
                Array.from({ length: (Math.round(review.rating*2)/2)+0.5 }).map((_,index)=>{
                  return (
                  
                  index==(Math.round(review.rating*2)/2)-0.5?<svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/></svg>

                 :
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                      )              
                     })
                
                  

                 :
                 Array.from({ length: (Math.round(review.rating*2)/2)}).map((_,index)=>{
                 return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#f57c19" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

                 })

                
              }
                            {
               (Math.round(review.rating*2)/2)<4.5?
               Array.from({ length:Math.round(5-(Math.round(review.rating*2)/2)-0.5)}).map((_,index)=>{
                return <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path fill="#4b4949" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>

                })
                :
             ''
              }
               </div>
               </div>
               <p>{review.comment}</p>
              {/* <p>{review.rating}</p> */}

               </div>

               </div>
            </div>
          );
        })}
        </div>

        <div className="make-review">
          
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
        
        <button type="submit" disabled={Object.keys(formik.errors).length > 0} className="p-2">
          Submit
        </button>
        {
  errmessage==''?'':
<h2 className='mt-2 bg-danger p-3'>{errmessage}</h2>
}

        
      </form>

      </div>

    </div>
    </div>
    </div>
  );
}
