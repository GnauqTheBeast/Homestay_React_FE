import { useEffect, useState } from 'react';
import { getAllHomestay } from '../../services/HomestayService';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router';

type Homestay = {
    id: number;
    name: string;
    address: string;
    rating?: number;
    price?: number;
    images?: string;
    rateStar: number;
    slug: string;
}

const inputStyle = {
    padding: '10px',
    width: '300px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    '@media (max-width: 600px)': {
        width: '100%',
        marginRight: '0',
        marginBottom: '10px'
    }
};
    
const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Homestay[]>([]);
    const [hotels, setHotels] = useState<Homestay[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllHomestay().then((res) => {
            if(res) {
                setHotels(res?.data);
            }
        })

    }, [])

    useEffect(() => {
        handleSearch();
    }, [searchQuery])

    const handleSearch = (e?: any) => {
        e && e.preventDefault();
        
        const results = hotels.filter(hotel =>
            hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hotels by name or location"
                    style={inputStyle}
                />
                <button
                    type="submit"
                    className="px-8 py-3 font-bold rounded-r-md text-white bg-lightGreen hover:opacity-70"
                >
                    Search
                </button>
            </form>

            <div>
                {searchResults.map(hotel => (
                        <div onClick={() => navigate(`/homestay/${hotel.slug}`)} key={hotel.id} style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                            <img src={hotel.images} alt={hotel.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }} />
                            <div>
                                <h2 style={{ margin: '0', marginBottom: '10px', color: '#333', fontWeight: 'bold', fontSize: '24px' }}>
                                    {hotel.name}
                                </h2>
                                <p style={{ margin: '0 0 10px', color: '#333', fontSize: '14px' }}>
                                    Location: {hotel.address}
                                </p>
                                <p style={{ margin: '0 0 10px', color: 'green', fontSize: '16px', fontWeight: 'bold' }}>
                                    Price: ${hotel.price}
                                </p>
                                <div className="flex items-center text-yellow-500 mb-2"> 
                                    {[...Array(5)].map((_, i) => (
                                        i < hotel.rateStar ? <FaStar key={i} /> : <FaRegStar key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}


export default SearchPage;