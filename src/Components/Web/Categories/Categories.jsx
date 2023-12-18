import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import './Categories.css'
import { Link } from 'react-router-dom';
export default function Categories() {


  const getCategories=async()=>{
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=10`); // for limit=10, see the documentation to get active categories(by default by backened is set to 4) ,get all is made for admin
  return data;
  }

  const {data,isLoading}=useQuery('web-categories',getCategories); // first argument is the name of data at browser cach memory
                                                                   // here we use curly braces wherase with useState we use square brackets
  console.log(data?.categories,'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

   if(isLoading){
   return <h2>Loading..........</h2>
   }


  return (

  <div className='container'>

  {
data?.categories.length>0?  // data?.categories >>> means if the data object has data then get the property categories
  <> 
{/* <div className='swiper-custom-pagination'></div> */}
      <Swiper
    // install Swiper modules
    modules={[Navigation, Pagination, Scrollbar,Autoplay]}
    spaceBetween={50}
    slidesPerView={3}
    navigation
    pagination={
      { 
        clickable: true,
        // el:'.swiper-custom-pagination',
    }
  }
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    // autoplay={{delay:1000}}
    // loop={true}
    
  >
    {
    data?.categories.map((category,index)=>{
  return(
    <SwiperSlide key={index} className='text-center'>
      <Link to={`/products/category/${category._id}`}>
    <h2 >{category.name}</h2>
    <img src={category.image.secure_url} alt="category image"/>
    </Link>
    </SwiperSlide>

  )
  })
}
  </Swiper>

  </>  
:
<h2>no categories found</h2>

}
</div>
  )
}
