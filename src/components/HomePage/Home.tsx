import React, { useEffect, useState } from 'react';
import { getCheapestHomestay, getTopHomestay, getTrendingHomestay } from '../../services/HomestayService';
import { HomestayResponse } from '../../models/HomestayDto';
import CarouselComponents from '../Carousel /Carousel';
import TopHomestay from './TopHomestay';

interface Props {}

const Home: React.FC = () => {
    const [trending, setTrending] = useState<HomestayResponse[]>([]);
    const [cheapest, setCheapest] = useState<HomestayResponse[]>([]);
    const [top, setTop] = useState<HomestayResponse[]>([]);

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

        getTopHomestay().then(res => {
            if(res) {
                setTop(res?.data);
            }
        })

    }, []);

    return (
        <>  
            <CarouselComponents props={ trending } title={ "Trending Homestay" } />
            <CarouselComponents props={ cheapest } title={ "Affordable Homestay" } />
            <TopHomestay homestays={ top } />
        </>
    );
}

export default Home;