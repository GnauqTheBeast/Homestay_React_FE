import { Avatar, Card, List, Pagination } from "antd";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

type TopHomestayProps = {
    homestays: HomestayResponse[];
}

type HomestayResponse = {
    name: string;
    images: string;
    address: string;
    price: number;
    slug: string;
    rateStar: number;
    description: string;
}

const Homestay = ({ homestays }: TopHomestayProps) => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHomestays = homestays.slice(startIndex, endIndex);

    return (
        <div style={{ padding: '0 20px' }}>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={currentHomestays}
                renderItem={(homestay) => (
                <List.Item>
                    <Card
                        onClick={() => navigate(`/homestay/${homestay.slug}`)}
                        hoverable
                        cover={<img alt={homestay.name} src={homestay.images} className="w-64 h-64 object-cover" />}
                        className="my-4"
                    >
                        <Card.Meta
                        title={homestay.name}
                        description={homestay.address}
                        avatar={<Avatar src={homestay.images} />}
                        />
                        <div className="flex justify-between items-center text-yellow-500 mt-2">
                            <p className="mt-2" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'green' }}>${homestay.price}</p>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    i < homestay.rateStar ? <FaStar key={i} /> : <FaRegStar key={i} />
                                ))}
                            </div>
                        </div>
                    </Card>
                </List.Item>
            )}
            />
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={homestays.length}
                onChange={handlePageChange}
                className="flex my-2 justify-center align-center"
            />
        </div>
    );
}

export default Homestay;