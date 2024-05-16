import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StartPage from "../pages/StartPage/StartPage";
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
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../components/Profile/Profile";
import Finance from "../components/Finance/Finance";
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailHomestayPage from "../pages/DetailHomestayPage/DetailHomestayPage";
import BookingPage from "../pages/BookingPage/BookingPage";
import BookingHomestayPage from "../pages/BookingHomestayPage/BookingHomestayPage";
import HostRoute from "./HostRoute";
import CreateHomestayPage from "../pages/CreateHomestayPage/CreateHomestayPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <StartPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "home", element: <HomePage /> },
        { path: "otp", element: <OtpPage /> },
        { path: "search", element: <SearchPage /> },
        { path: "homestay/create", 
          element: (
          <HostRoute>
            <CreateHomestayPage />
          </HostRoute>
          )
        },
        { path: "homestay/:slug", element: <DetailHomestayPage /> },
        {
          path: "booking/:slug",
          element: (
            <ProtectedRoute>
              <BookingHomestayPage />
            </ProtectedRoute>
          ),
          // children: [
          //   { path: ":slug", element: <BookingHomestayPage />},
          // ],
        },
        {
            path: "admin",
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
            children: [
              { path: "dashboard", element: <DashboardPage /> },
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
              { path: "profile", element: <Profile />},
              { path: "finance", element: <Finance />},
            ],
          },
      ],
    },
  ]);