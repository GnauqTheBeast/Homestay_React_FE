import { useEffect, useState } from "react";
import { Avatar, List, Pagination, Select } from "antd";
import { getAllHomestay } from "../../services/HomestayService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const { Option } = Select;

interface Homestay {
  id: number;
  name: string;
  address: string;
  rateStar: number;
  price: number;
  images: string;
  slug: string;
  description: string;
  service: string;
  viewCount: number;
}

const HomestayListPage = () => {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchHomestays();
  }, [sortBy]);

  const fetchHomestays = async () => {
    try {
      const response = await getAllHomestay();
      setHomestays(response.data);
    } catch (error) {
      toast.error("Error fetching homestays:");
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleClick = (slug: string) => {
    navigate(`/homestay/${slug}`);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full px-4">
        <div className="flex justify-center mb-4">
          <Select defaultValue="" style={{ width: 120 }} onChange={handleSortChange}>
            <Option value="">Sort By</Option>
            <Option value="viewCount">View Count</Option>
            <Option value="rateStar">Rate Star</Option>
          </Select>
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <List
            pagination={{
              position: 'bottom',
              align: 'center',
              pageSize: 8,
              defaultCurrent: 1,
            }}
            itemLayout="vertical"
            size="large"
            dataSource={homestays}
            renderItem={(homestay: Homestay) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={homestay.images} />}
                  title={<a onClick={() => handleClick(homestay.slug)}>{homestay.name}</a>}
                  description={homestay.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
  
};

export default HomestayListPage;
