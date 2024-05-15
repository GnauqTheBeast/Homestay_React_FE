import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import { LoginRequest, LoginResponse, RegisterRequest} from "../models/UserDto";
import { ResponeDto } from "../models/ResponeDto";

const api = "http://localhost:8000/";

export const loginAPI = async (request : LoginRequest) => {
  try {
    const data = await axios.post<LoginResponse>(api + "auth/login", {
      email: request.email,
      password: request.password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (request: RegisterRequest) => {
  try {
    const data = await axios.post<ResponeDto>(api + "auth/register", {
      email: request.email,
      fullName: request.fullName,
      password: request.password,
      passwordConfirmation: request.passwordConfirmation,
      phone: request.phone,
    });
    
    return data;
  } catch (error) {

    handleError(error);
  }
};

export const getUserAPI = async (access_token: string) => {
  try {
    const data = await axios.get<any>(api + "users/me", {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserAPI = async (users: any, access_token: any) => {
  try {
    const data = await axios.patch<any>(api + "users/me/edit", {
      fullName: users.fullName,
      phone: users.phone,
    }, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}

export const otpAPI = async (access_token: string) => {
  try {
    const data = await axios.get<any>(api + "otp/send-otp", {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    console.log(data);

    return data;
  } catch (error) {
    handleError(error);
  }
}

export const otpHandler = async (otp: string, access_token: string) => {
  try {
    const data = await axios.post<any>(api + "otp/confirm-otp", { otp: otp }, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}
