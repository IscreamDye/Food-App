import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "./Signup";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Account from "./Account";
import Cart from "./Cart";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactsUs";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/cart", element: (<PrivateRoute> <Cart /> </PrivateRoute>) },
  { path: "/account", element: (<PrivateRoute> <Account /> </PrivateRoute>) },
  { path: "/signin", element: <Signin /> },
  { path: "/dashboard", element: (<PrivateRoute> <Dashboard /> </PrivateRoute>)},
  { path: "/AboutUs", element: <AboutUs /> },
  { path: "/ContactUs", element: <ContactUs /> },
]);
