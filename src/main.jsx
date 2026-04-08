import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './App/store'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './Components/Login'
import Home from './Components/Home'
import NotFound from './Components/NotFound'
import ProductsCart from './Components/ProductsCart'
import ProductDetails from './Components/ProductDetails'

const router =createBrowserRouter([{
    path : '/',
    element : <Layout/>,
    children : [{
      path : '',
      element : <Home/>
    },
      {
        path : 'productDetails/:id',
        element : <ProductDetails/>
      },
      {
        path : 'cart',
        element : <ProductsCart/>
      },
      {
        path : '*',
        element : <NotFound/>
      }
    ]
  },
    {
      path : '/login',
      element : <Login/>
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
