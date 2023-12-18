import React from 'react'
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './Components/Web/Context/UserContext.jsx';
import { CartContextProvider } from './Components/Web/Context/CartContext.jsx';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
<>
{/* to make the app child of UserContext so that he can see the variables there */}
<UserContextProvider> 
<CartContextProvider>
<QueryClientProvider client={queryClient}>
<ToastContainer />

<App />
</QueryClientProvider>
</CartContextProvider>
</UserContextProvider>

</>
  
 
)
