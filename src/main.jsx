import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



import Home from './Pages/Home/Home.jsx';
import AuthProvider from './Components/Provider/AuthProvider.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import MainLayout from './Components/MainLayout/MainLayout.jsx';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import WhoUse from './Pages/Home/WhoUse.jsx';
import FAQ from './Pages/FAQ/FAQ.jsx';
import DashboardPage from './Components/Dashboard/DashboardPage.jsx';

const queryClient = new QueryClient();



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signin',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/whoUse',
        element: <WhoUse></WhoUse>
      },
      {
        path: '/faq',
        element: <FAQ></FAQ>
      },
      {
        path: '/dashboardPage',
        element: <DashboardPage></DashboardPage>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
