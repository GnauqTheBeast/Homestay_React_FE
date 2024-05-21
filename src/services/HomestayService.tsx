import axios from "axios";
import { HomestayResponse } from "../models/HomestayDto";
import { toast } from "react-toastify";

const api = "http://localhost:8000/homestay/";

export const getAllHomestay = async () => {
  try {
    const data: any = await axios.get<HomestayResponse[]>(api + "all");

    return data;
  } catch (error) {
    // handleError(error);
  }
}


export const getTrendingHomestay = async () => {
  try {
    const data: any = await axios.get<HomestayResponse[]>(api + "trending");

    return data;
  } catch (error) {
    // handleError(error);
  }
}

export const getCheapestHomestay = async () => {
  try {
    const data: any = await axios.get<HomestayResponse[]>(api + "cheapest");

    return data;
  } catch (error) {
    // handleError(error);
  }
}

export const getTopHomestay = async () => {
  try {
    const data: any = await axios.get<HomestayResponse[]>(api + "top");

    return data;
  } catch (error) {
    
  }
}

export const getHomestay = async (slug: string) => {
  try {
    const data: any = await axios.get<HomestayResponse>(api + slug);

    return data;
  } catch (error) {
    
  }
}

export const viewCountHomestay = async (slug: string) => {
  try {
    await axios.patch<any>(api + `view-increase/${slug}`);
  } catch (error) {
    // handleError(error);
  }
}

export const getUserHomestay = async (userId: number) => {
  try {
    return await axios.get<HomestayResponse>(api + `${userId}/all`);
  } catch (error) {
    toast.error("Cant not get user homestay")
  }
}