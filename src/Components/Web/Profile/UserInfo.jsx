import React, { useContext } from 'react'
import { UserContext } from './../Context/UserContext';

export default function UserInfo() {
    let {userDetails,setUserDetails,loading}=useContext(UserContext);
    console.log(userDetails);
    if(loading) {
        return <h2>Loading .........</h2>
       }
  return (
    <>
    <h2>{userDetails.userName}</h2>
    <div className='w-25 h-25'>
    <img src={userDetails.image.secure_url} alt="profile-image" className='img-fluid w-100' />
    </div>
    </>
  )
}
