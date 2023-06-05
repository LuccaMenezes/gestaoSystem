import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Register from './pages/register/Register.jsx'
import PontoDeVenda from './pages/pdv/PontoDeVenda.jsx'
import Entry from './pages/entry/Entry.jsx'
import Withdraw from './pages/withdraw/Withdraw.jsx'
import Products from './pages/products/Products.jsx'
import Providers from './pages/providers/Providers.jsx'
import Report from './pages/report/Report.jsx'
import Settings from './pages/settings/Settings.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/pontodevenda",
        element: <PontoDeVenda />,
      },
      {
        path: "/entradas",
        element: <Entry />,
      },
      {
        path: "/saidas",
        element: <Withdraw />,
      },
      {
        path: "/produtos",
        element: <Products />,
      },
      {
        path: "/fornecedores",
        element: <Providers />,
      },
      {
        path: "/relatorios",
        element: <Report />,
      },
      {
        path: "/configuracoes",
        element: <Settings />,
      },
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
