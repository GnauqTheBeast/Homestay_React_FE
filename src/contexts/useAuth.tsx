import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, otpAPI, otpHandler, registerAPI } from "../services/UserService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { LoginRequest, RegisterRequest, LoginResponse } from "../models/UserDto";

type UserContextType = {
  userId: string | null;
  token: string | null;
  registerUser: (registerRequest:RegisterRequest) => void;
  loginUser: (LoginRequest:LoginRequest) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  otpUser: (access_token: string) => void;
  otpVerify: (otp:string) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const access_token = localStorage.getItem("access_token");
    if (userId && access_token) {
      setUser(userId);
      setToken(access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (registerRequest: RegisterRequest) => {
    await registerAPI(registerRequest)
      .then(() => {
          toast.success("Register Success!");
          navigate("/login");
      })
      .catch(() => toast.warning("Register Error!"));
  };

  const loginUser = async (loginRequest:LoginRequest) => {
    await loginAPI(loginRequest)
        .then((res) => {
            if (res) {
            try {
                const response: LoginResponse = res?.data as LoginResponse;
                localStorage.setItem("status", response.status);
                localStorage.setItem("access_token", response.access_token);
                localStorage.setItem("user", response.userId.toString());
                setToken(response.access_token);
                setUser(response.userId.toString());
                toast.success("Login Success!");
                console.log(response.status);
                if(response.status == "pending") {
                  otpUser(response.access_token);
                  navigate("/otp");
                  return;
                }
                navigate("/dashboard");
            }
            catch(e){
                toast.warning("Server error occured");
            }
        }
    })
    .catch((e) => toast.warning("Server error occured"));
  };

  const otpUser = async (access_token: string) => {
    await otpAPI(access_token)
       .then(() => { 
          toast.success("Check your OTP in your email");
       });
  }

  const otpVerify = async (otp: string) => {
    const access_token = localStorage.getItem("access_token");
    await otpHandler(otp, access_token as string)
       .then(() => { 
          toast.success("OTP verified");
          navigate("/dashboard");
       })
       .catch((e) => toast.warning("Server error occured"));
  }

  const isLoggedIn = () => {
    return !!userId;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, userId, token, logout, isLoggedIn, registerUser, otpUser, otpVerify }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);