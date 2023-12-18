import { createContext, useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';

export  let UserContext=createContext(null);

export default function UserContextProvider({children}){

    const [userTokenContext,setUserTokenContext]=useState(null);
    const [loading,setLoading]=useState(true);

// useEffect(() =>{            // to solve the issue " when refreshing the page, navbar menue back to login and regester even the user is logged in"
//     if(localStorage.getItem('userToken')!=null){
//         setUserTokenContext(localStorage.getItem('userToken'));
//     }
// },[]);

const [userDetails,setUserDetails] = useState(null);
const getUserDetails = async ()=>{
    if(userTokenContext){
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
    {headers:{Authorization:`Tariq__${userTokenContext}`}}
    )
        setUserDetails(data.user);
        setLoading(false);

    }
}

useEffect( ()=>{
    getUserDetails();
},[userTokenContext])


// const saveCurrentUserContext=() => {  // we could put this function inside the login function but we put it here so that once the user is succeffulty logged in in the login page,the browser will save his token and this function will be called in the login component function so that the user detail value will be updated in order to send it to any component
//     const encodedTokenValue=localStorage.getItem('userToken');
//     const decodedTokenValue=jwtDecode(encodedTokenValue);
//     console.log(decodedTokenValue);
//     setUserToken(decodedTokenValue); // we could send the decodedTokenValue but we need to make update to the render  (i.e update to the Layout >>> Navbar dropdown menue to have profile and logout componentns)
//   }

    return (
        <UserContext.Provider value={{userTokenContext,setUserTokenContext,userDetails,setUserDetails,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    )

}