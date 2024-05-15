import { Avatar, Card, List } from "antd";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

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

const TopHomestay = ({ homestays }: TopHomestayProps) => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '0 20px' }}>
            <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={homestays}
            renderItem={(homestay) => (
                <List.Item>
                    <Card
                        onClick={() => navigate(`/homestay/${homestay.slug}`)}
                        hoverable
                        cover={<img alt={homestay.name} src={homestay.images} />}
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
        </div>
      );
}

export default TopHomestay;