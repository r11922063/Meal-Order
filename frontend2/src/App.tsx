import './App.css';
import Login from './pages/Login';
import Customer from './pages/Customer';
import CustomerLayout from './layouts/CustomerLayout';
import Settlement from './pages/Settlement';
import Orders from './pages/Orders';
import ShopCart from './pages/ShopCart';
import Vendor from './pages/Vendor';
import AllMeals from './pages/AllMeals';
import MealAmount from './pages/MealAmount';
import VendorLayout from './layouts/VendorLayout';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login/>}/>
        <Route path="customer/:id" element={<CustomerLayout/>}>
          <Route index element={<Customer/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="shopcart" element={<ShopCart/>}/>
          <Route path="settlement" element={<Settlement identity='customer'/>}/>
        </Route>
        <Route path="vendor/:id" element={<VendorLayout/>}>
          <Route index element={<Vendor/>}/>
          <Route path="mealamount" element={<MealAmount/>}/>
          <Route path="allmeals" element={<AllMeals/>}/>
          <Route path="settlement" element={<Settlement identity='vendor'/>}/>
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