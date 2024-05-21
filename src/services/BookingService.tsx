import axios from "axios";
import { BookingRequest } from "../models/BookingDto";
import { toast } from "react-toastify";
import { getHomestay } from "./HomestayService";
import { countDaysBetweenDates } from "../helpers/utils/DateConverter";
import { ResponeDto } from "../models/ResponeDto";

const api = "http://localhost:8000/";

export const booking = async (slug: string, newBooking: BookingRequest) => {
    try {
      const data: any = await axios.post<any>(api + `booking/${slug}`, newBooking, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
      });
  
      return data;
    } catch (error) {
      // handleError(error);
      toast.error("Can't booking");
    }
}

export const payment = async (slug: string, newBooking: BookingRequest) => {
  try {
    const bookingObj = await booking(slug, newBooking);
    const bookingData = bookingObj.data;

    console.log({ 
      slug: slug,
      orderCode: bookingData.id,
      homestayName: bookingData.homestay.name,
      numPeople: bookingData.numPeople,
      price: bookingData.price,
      numDay: countDaysBetweenDates(bookingData.checkIn, bookingData.checkOut)
    })

    const data: any = await axios.post<ResponeDto>(api + "payment/create-payment-link", { 
      slug: slug,
      orderCode: bookingData.id,
      homestayName: bookingData.homestay.name,
      numPeople: bookingData.numPeople,
      price: bookingData.price,
      numDay: countDaysBetweenDates(bookingData.checkIn, bookingData.checkOut)
    });
    
    return data;
  } catch (error) {
    // handleError(error);
    toast.error("Can't booking");
  }
}

