import React, { useContext } from 'react'
import { UserContext } from './../Context/UserContext';
import style from './Profile.module.css';
import { Link, Outlet } from 'react-router-dom';

export default function Profile() {

    let {userDetails,setUserDetails,loading}=useContext(UserContext);
    //console.log(userDetails);

   if(loading) {
    return <h2>Loading .........</h2>
   }



  return (
<aside className={`${style.profile}`}>
  <div className={`${style.profileLinks}`}>
    <nav>
      {/* <Link to='/profile/'>info</Link> */}
     {/* by using index:true */}
      <Link to=''>info</Link> 
      <Link to='contact'>contact</Link>
      <Link to='getorder'>Orders</Link>
    </nav>
  </div>

   <div className={`${style.userData} m-auto`}>
   <Outlet/>


    </div>




</aside>


  )
}
