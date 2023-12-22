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
import DashboardLayout from './Components/MainLayout/DashboardLayout.jsx';
import AddTodo from './Pages/Dashboard/AddTodo.jsx';
import TaskManage from './Pages/Dashboard/TaskManage.jsx';
import UpdateTask from './Pages/Dashboard/UpdateTask.jsx';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: 'manage',
        element: <TaskManage></TaskManage>
      },
      {
        path: 'addTodo',
        element: <AddTodo></AddTodo>
      },
      {
        path: 'updatetask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/tasks/${params.id}`
          ),
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
