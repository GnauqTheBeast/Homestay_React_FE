import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Income from "../components/Income/Income";
import Expense from "../components/Expense/Expense";
import Dashboard from "../components/Dashboard/Dashboard";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import User from "../components/User/User";
import OtpPage from "../pages/OtpPage/OtpPage";
import UsersPage from "../pages/UsersPage/UsersPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "dashboard", element: <DashboardPage /> },
        { path: "otp", element: <OtpPage /> },
        {
            path: "admin/dashboard",
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
            children: [
              { path: "", element: <Dashboard /> },
              { path: "homestay", element: <Income /> },
              { path: "user", element: <User />},
              { path: "revenue", element: <Expense /> },
            ],
          },
          {
            path: "users",
            element: (
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            ),
            children: [
            
            ],
          },
      ],
    },
  ]);