import React from 'react';
import './App.css';
import Login from './pages/Login';
import Customer from './pages/Customer';
import CustomerLayout from './layouts/CustomerLayout';
import Settlement from './pages/Settlement';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login/>}/>
        <Route path="customer/:customerId" element={<CustomerLayout/>}>
          <Route index element={<Customer/>}/>
          <Route path="settlement" element={<Settlement/>}/>
        </Route>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={route}/>
  );
}

export default App;