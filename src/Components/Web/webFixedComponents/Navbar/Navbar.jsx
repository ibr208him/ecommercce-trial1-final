import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext.jsx";
import { UserContext } from "../../Context/UserContext.jsx";
import { useState,useEffect } from "react";

export default function Navbar() {
  let {userDetails,setUserDetails}=useContext(UserContext);
  const { userTokenContext, setUserTokenContext } = useContext(UserContext);


// let {getCartContext}=useContext(CartContext);
// let [cartCount,setCartCount]=useState();
// let getCartContent=async()=>{
//   if(userTokenContext){
//     let res=await getCartContext();
//     setCartCount(res.count);
//   }

// }
// useEffect(()=>{
//   getCartContent();
// },[getCartContext()])
  
let {count,setCount}=useContext(CartContext);


  const logout = () => {
    localStorage.removeItem("userToken");
    setUserTokenContext(null); // otherwise the user value will not be null when logging out
    setUserDetails(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          T-shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/products/page/${1}`} className="nav-link">
                Products
              </Link>
            </li>
            {userTokenContext ? (
              <li className="nav-item">
                <Link to="/cart" className="nav-link cart">
                  Cart <span className="badge bg-info">{count} </span>
                
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

{
  userDetails?.userName?
 userDetails.userName
:
'Account'
}
              </a>
              <ul className="dropdown-menu">
                {!userTokenContext ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/login"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
