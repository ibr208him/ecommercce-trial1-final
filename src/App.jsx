import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { CartContext, CartContextProvider } from './Components/Web/Context/CartContext.jsx';
import { UserContext } from './Components/Web/Context/UserContext.jsx';
import {router} from './Layouts/router.jsx'


export default function App() {
let {userTokenContext,setUserTokenContext}=useContext(UserContext);
let {count,setCount,getCartContext}=useContext(CartContext)

  useEffect(() =>{            // to solve the issue " when refreshing the page, navbar menue back to login and regester even the user is logged in"
    if(localStorage.getItem('userToken')!=null){
        setUserTokenContext(localStorage.getItem('userToken'));
        setCount(getCartContext().count)
    }
},[userTokenContext]); // when the user logged out from ccurrent account and enter with new account 




  return (

 
    <RouterProvider router={router}/>
  

  )
}
