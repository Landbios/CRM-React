import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import NuevoCliente , {action as nuevoClienteAction}from './pages/NuevoCliente'
import Index, {loader as clientesloader} from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import {action as eliminarClienteAction} from './components/Cliente'


const router = createBrowserRouter([


  {
    path:'/',
    element: <Layout/>,
    children: [
      
    {
      index:true,
      element:<Index/>,
      loader: clientesloader,
      errorElement:<ErrorPage/>
    }, 
    {

      path:'/clientes/nuevo',
      element:<NuevoCliente/>,
      action: nuevoClienteAction,
      errorElement:<ErrorPage/>
    },
    {
      path:'/clientes/:clienteid/editar',
      element:<EditarCliente/>,
      loader: editarClienteLoader,
      action:editarClienteAction,
      errorElement:<ErrorPage/>
    },
    {
      path:'/clientes/:clienteid/eliminar',
      errorElement:<ErrorPage/>,
      action: eliminarClienteAction
    }

  
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
