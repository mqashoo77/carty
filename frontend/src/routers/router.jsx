import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";
import UserOrders from "../pages/profile/UserOrders";
import OrderDetails from "../pages/profile/OrderDetails";
import UserPayments from "../pages/profile/UserPayments";
import UserReviews from "../pages/profile/UserReviews";
import UserProfile from "../pages/profile/UserProfile";
import Profile from "../pages/profile/Profile";

//For Admin Panel
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        children: [
          // user routes
          { path: "", element: <UserProfile /> },
          { path: "orders", element: <UserOrders /> },
          { path: "payments", element: <UserPayments /> },
          { path: "reviews", element: <UserReviews /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  //admin routes (only accessible by admin) Todo: private routes with role field
  {
    path: "/dashboard",
    element: (
      <PrivateRoute role="admin">
        {" "}
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute role="admin">
            <AdminDMain />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",

        element: (
          <PrivateRoute role="admin">
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <ManageProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute role="admin">
            <ManageUser />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role="admin">
            <ManageOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
