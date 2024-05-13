import axios, { AxiosResponse } from "axios";
import { HomestayResponse } from "../models/HomestayDto";

const api = "http://localhost:8000/homestay/";

type Props = {}

export const getTrendingHomestay = async () => {
  try {
    const data: any = await axios.get<HomestayResponse[]>(api + "trending");

    return data;
  } catch (error) {
    // handleError(error);
  }
}