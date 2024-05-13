import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { Link } from "react-router-dom";
import { getTrendingHomestay } from '../../services/HomestayService';
import { HomestayResponse } from '../../models/HomestayDto';

interface Props {}

const carouselContainerStyle = {
    marginBottom: '2rem',
  };
  
const contentStyle = {
    color: '#fff',
    background: '#364d79',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const titleStyle = {
    marginBottom: '1rem',
    fontSize: '24px',
    color: '#364d79', 
};

const imageStyle: React.CSSProperties = {
    maxHeight: '300px', // Set the maximum height for the images
    width: '100%', // Ensure the images span the entire width of the carousel
  };
  

const Home: React.FC = () => {
    const [trending, setTrending] = useState<HomestayResponse[]>([]);

    useEffect(() => {
        getTrendingHomestay().then(res => {
            if(res) {
                setTrending(res?.data);
            }
        })

    }, [trending]);

    return (<>
        <div className="carousel-wrapper">
            <div className="carousel-container">
                <h2 style={titleStyle}>Trending Homestay</h2>
                <Carousel autoplay style={carouselContainerStyle}>
                    {trending.map((item, index) => (
                        <div key={index}>
                            {/* <h3 style={contentStyle}>{item.name}</h3> */}
                            <img src={item.images} alt={item.name} style={imageStyle}/>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="carousel-container">
            <h2 style={titleStyle}>Cheapest Homestay</h2>
            <Carousel autoplay style={carouselContainerStyle}>
                <div>
                <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            </div>
        </div>
  </>);
}

export default Home;