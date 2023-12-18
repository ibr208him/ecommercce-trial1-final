import { createContext } from "react";
import React, {useState} from 'react'


export  const CartContext=createContext(null);

// export function CartContextProvider(props){
// console.log(props); // it is an object ,has a property called children which is the component who has called the provider and it is a child of the provider

//     return <h2>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h2>;
// }

export function CartContextProvider({children}){
    console.log(children);
    const [name,setName]=useState('Ibraheem Maali');
    const [salary,setSalary]=useState('2000$');
        return (
            <CartContext.Provider value={{name,salary}}>
                {children}
            </CartContext.Provider>
        )
    }