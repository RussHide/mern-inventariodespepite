import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Products from './pages/Products'
import Tickets from './pages/Tickets'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/insumos', element: <Products/>},
  {path: '/vales', element: <Tickets/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
