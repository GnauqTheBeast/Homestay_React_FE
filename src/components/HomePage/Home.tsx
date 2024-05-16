import React, { useEffect, useState } from 'react';
import { getAllHomestay, getCheapestHomestay, getTopHomestay, getTrendingHomestay } from '../../services/HomestayService';
import { HomestayResponse } from '../../models/HomestayDto';
import CarouselComponents from '../Carousel /Carousel';
import Homestay from './AllHomestay';

const Home: React.FC = () => {
    const [trending, setTrending] = useState<HomestayResponse[]>([]);
    const [cheapest, setCheapest] = useState<HomestayResponse[]>([]);
    const [homestay, setHomestay] = useState<HomestayResponse[]>([]);

    useEffect(() => {
        getTrendingHomestay().then(res => {
            if(res) {
                setTrending(res?.data);
            }
        })

        getCheapestHomestay().then(res => {
            if(res) {
                setCheapest(res?.data);
            }
        })

        getAllHomestay().then(res => {
            if(res) {
                setHomestay(res?.data);
            }
        })

    }, []);

    return (
        <>  
            <CarouselComponents props={ trending } title={ "Trending Homestay" } />
            <CarouselComponents props={ cheapest } title={ "Affordable Homestay" } />
            <Homestay homestays={ homestay } />
        </>
    );
}

export default Home;