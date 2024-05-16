import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate, useParams } from "react-router";
import { HomestayResponse } from "../../models/HomestayDto";
import { useEffect, useState } from "react";
import { getHomestay, viewCountHomestay } from "../../services/HomestayService";
import { FaRegStar, FaStar } from "react-icons/fa";

interface Props {}

type Homestay = {
    id: number;
    name: string;
    address: string;
    rateStar: number;
    price: number;
    images: string;
    slug: string;
    description: string;
    service: string;
}

const DetailHomestayComponents = () => {
    const initValueHomestay = { 
        id: 0,
        name: '',
        address: '',
        rateStar: 0,
        price: 0,
        images: '',
        slug: '',
        description: '',
        service: '',
    }
    const { slug } = useParams();
    const [homestay, setHomestay] = useState<Homestay>(initValueHomestay);
    
    useEffect(() => {
        getHomestay(slug as string).then((res) => {
            if (res) {
              setHomestay(res?.data);
            }
        });

        viewCountHomestay(slug as string).then(() => {});
    }, [])

    const navigate = useNavigate();
    const handleBooking = () => {
      navigate(`/booking/${homestay.slug}`);
    }

    return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img alt="homestay" src={homestay.images} />}
                >
                  <Meta title={homestay.name} description={`Location: ${homestay.address}`} />
                </Card>
              </div>
              <div className="md:col-span-1">
                <div>
                  <h1 className="font-semibold">Homestay Details</h1>
                  <p className="text-lg">Price: <span className="text-green-600">${homestay.price} / Night</span></p>
                  <p className="text-lg flex items-center">
                    Rating: 
                        <div className="flex text-yellow-500 ml-2">
                            {[...Array(5)].map((_, i) => (
                                i < homestay.rateStar ? <FaStar key={i} /> : <FaRegStar key={i} />
                            ))}
                        </div>  
                  </p>
                  {homestay.service ? <p className="text-lg">Amenities: {homestay.service}</p> : <></>}
                  <p className="text-lg">Available Dates: May 20, 2024 - May 25, 2024</p>
                  {/* <p className="text-lg">Hosted by: John Doe</p> */}
                  {homestay.description ? <p className="text-lg">{homestay.description}</p> : <></>}
                  <Button onClick={handleBooking} type="primary">Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default DetailHomestayComponents;