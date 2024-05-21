import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StartPage from "../pages/StartPage/StartPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AdminHomestay from "../components/AdminHomestay/AdminHomestay";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminUser from "../components/AdminUser/AdminUser";
import OtpPage from "../pages/OtpPage/OtpPage";
import UsersPage from "../pages/UsersPage/UsersPage";
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../components/Profile/Profile";
import Finance from "../components/Finance/Finance";
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailHomestayPage from "../pages/DetailHomestayPage/DetailHomestayPage";
import BookingHomestayPage from "../pages/BookingHomestayPage/BookingHomestayPage";
import HostRoute from "./HostRoute";
import CreateHomestayPage from "../pages/CreateHomestayPage/CreateHomestayPage";
import ListHomestayPage from "../pages/ListHomestayPage/ListHomestayPage";
import AdminRoute from "./AdminRoute";
import AdminDashboardPage from "../pages/AdminDashboardPage/AdminDashboardPage";
import EditHomestayPage from "../pages/EditHomestayPage/EditHomestayPage";
import HomestayPage from "../pages/HomestayPage/HomestayPage";
import BookedHomestayPage from "../pages/BookedHomestayPage/BookedHomestayPage";

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
        { path: "homestay", element: <HomestayPage />},
        { path: "homestay", 
          element: (
          <HostRoute>
            <UsersPage />
          </HostRoute>
          ),
          children: [
            { path: "create", element: <CreateHomestayPage /> },
            { path: "edit/:slug", element: <EditHomestayPage /> },
          ],
        },
        { path: "homestay/:slug", element: <DetailHomestayPage />},
        {
          path: "booking",
          element: (
            <ProtectedRoute>
              <BookingHomestayPage />
            </ProtectedRoute>
          ),
          children: [
            { path: ":slug", element: <BookingHomestayPage />},
          ],
        },
        {
            path: "admin",
            element: (
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            ),
            children: [
              { path: "dashboard", element: <DashboardPage /> },
              { path: "homestay", element: <AdminHomestay /> },
              { path: "users", element: <AdminUser /> },
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
              { 
                path: "finance", 
                element:
                <HostRoute>
                  <Finance />
                </HostRoute>
              },
              { 
                path: "homestay-list", 
                element:
                  <HostRoute>
                    <ListHomestayPage /> 
                  </HostRoute>
              },
             { 
              path: "booked", 
              element:
                <HostRoute>
                  <BookedHomestayPage /> 
                </HostRoute> 
              },
            ],
          },
      ],
    },
  ]);