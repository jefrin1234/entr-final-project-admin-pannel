import {
  createBrowserRouter,
} from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthAdmin } from "./protectedRoutes/AuthAdmin";
import Notifications from "../components/Notifications";
import NotificationDetails from "../components/NotificationDetails";
import Customers from "../components/Customers";
import Products from "../components/Products";
import Sellers from "../components/Sellers";
import SellerDetails from "../components/SellerDetails";
import Ratings from "../components/Ratings";
import SellerProducts from "../components/SellerProducts";
import AllOrders from "../components/AllOrders";
import SellerOrders from "../components/SellerOrders";
import SalesDashboard from "../components/Sales";
import Profile from "../components/Profile";


export const router = createBrowserRouter([
  {
    path: "/",
   element: (
      <AuthAdmin>
        <AdminLayout />
      </AuthAdmin>
    ),
    children:[
      {
        path:'',
        element:<Home/>,
        children:[
          {
            path:'/',
            element:<SalesDashboard/>
          },
          {
            path:'notifications',
            element:<Notifications/>
          },
          {
            path:'/notifications/notification-details/:id',
            element:<NotificationDetails/>
          },
          {
            path:'customers',
            element:<Customers/>
          },
          {
            path:'products',
            element:<Products/>
          },
          {
            path:'products/product-ratings/:productId',
            element:<Ratings/>
          },
          {
            path:'sellers',
            element:<Sellers/>
          },
          {
            path:'sellers/seller-details/:sellerId',
            element:<SellerDetails/>
          },
          {
            path:'seller/products/:sellerId',
            element:<SellerProducts/>
          },
          {
            path:'all-orders',
            element:<AllOrders/>
          },
          {
            path:'seller/seller-orders/:sellerId',
            element:<SellerOrders/>
          },
       
          {
            path:"account",
            element:<Profile/>
          }

      
         
        ]
      },
      
      
    ]
  },
  { 
      path:'/login',
      element:<Login/>
       
  }
]);