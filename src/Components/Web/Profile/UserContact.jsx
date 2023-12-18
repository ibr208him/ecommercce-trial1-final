import React, { useContext } from 'react'
import { UserContext } from './../Context/UserContext';

export default function UserContact() {
    let {userDetails,setUserDetails,loading}=useContext(UserContext);
    console.log(userDetails);
    if(loading) {
        return <h2>Loading .........</h2>
       }
  return (
    <>
    <h2>{userDetails.email}</h2>
    <h2>{userDetails.phone?userDetails.phone:'phone number was not provided'}</h2>
    <h2>{userDetails._id}</h2>
    </>
  )
}
