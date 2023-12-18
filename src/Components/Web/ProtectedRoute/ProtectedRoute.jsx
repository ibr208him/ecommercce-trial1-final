import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children,protectType}) {

//     if(localStorage.getItem('userToken')==null){
//         return <Navigate to='/login'/>
//     }
//     else{
//   return children
//     }
// }

if(localStorage.getItem('userToken')==null){
    if(protectType=='outised to page inside'){ //this case to access cart page when the user is not logged in
    return <Navigate to='/login'/>
    }

    else if(protectType=='inside to login page' || protectType=='inside to register page'){ // this case to access login page or register page from any page when the user is already logged in
        return children
    }   
}
else{
    if(protectType=='outised to page inside'){  
return children
    }

    else if(protectType=='inside to login page' || protectType=='inside to register page'){
        return <Navigate to='/' />

    }
}
}