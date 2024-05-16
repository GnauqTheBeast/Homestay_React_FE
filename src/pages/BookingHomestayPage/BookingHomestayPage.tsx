import { Form, Input, DatePicker, Button, Card } from 'antd';

const { RangePicker } = DatePicker;

const BookingHomestayPage = () => {
  const handleFinish = (values: any) => {
    console.log('Form Values:', values);
    console.log(values.dates[0])
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Book Your Stay</h1>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="numPeople"
            label="Number of People"
            rules={[{ required: true, message: 'Please enter the number of people' }, { type: 'number', min: 1, message: 'Please enter a valid number' }]}
          >
            <Input type="number" placeholder="Enter the number of people" />
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