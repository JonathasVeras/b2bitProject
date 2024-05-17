import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/Login.tsx'
import Profile from './pages/Profile/Profile.tsx'

const router = createBrowserRouter([
  {
    path: "/b2bitProject/",
    element: <App/>,
    children:[
      {
        path:"/b2bitProject/",
        element:<Login/>
      },
      {
        path:"/b2bitProject/profile",
        element:<Profile/>
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
