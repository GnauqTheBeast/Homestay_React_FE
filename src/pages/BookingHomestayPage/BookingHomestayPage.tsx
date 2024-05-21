import { Form, DatePicker, Button, Card, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getHomestay } from '../../services/HomestayService';
import { countDaysBetweenDates, parseDate } from '../../helpers/utils/DateConverter';
import { BookingRequest } from '../../models/BookingDto';
import { payment } from '../../services/BookingService';

const { RangePicker } = DatePicker;

const BookingHomestayPage = () => {
  const { slug } = useParams();
  const [form] = Form.useForm();
  const [price, setPrice] = useState(0);
  
  useEffect(() => {
    getHomestay(slug as string).then((res) => {
      if (res) {
        const fetchedPrice = res?.data.price;
        setPrice(fetchedPrice);
        form.setFieldsValue({ price: fetchedPrice });
      }
    });
  }, [slug, form]);

  const handleFinish = async (values: any) => {
    const date1 = values.dates[0];
    const date2 = values.dates[1];

    const checkIn = parseDate(date1);
    const checkOut = parseDate(date2);

    const newBooking: BookingRequest = {
      checkIn,
      checkOut,
      numPeople: values.numPeople,
      price: values.price * countDaysBetweenDates(checkOut, checkIn),
    }

    payment(slug as string, newBooking).then((res) => {
      window.location.href = res.data;
    });
  };

  return (
    <div className="flex flex-auto justify-center items-center h-screen bg-gray-100">
      <Card className="max-w-sm bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Book Your Stay</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ price }}
        >
          <Form.Item
            name="numPeople"
            label="Number of People"
            rules={[{ required: true, message: 'Please enter the number of people' }, { type: 'number', min: 1, message: 'Please enter a valid number' }]}
          >
            <InputNumber placeholder="Enter the number of people" min={1} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
          >
            <InputNumber type="number" value={price} readOnly />
          </Form.Item>
          <Form.Item
            name="dates"
            label="Dates"
            rules={[{ required: true, message: 'Please select your booking dates' }]}
          >
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Book Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingHomestayPage;
