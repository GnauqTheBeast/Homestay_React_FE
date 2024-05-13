import React, { useState } from 'react';
import { Flex, Input, Typography, Button } from 'antd';
import type { GetProp } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/useAuth';

const { Title } = Typography;

const App: React.FC = () => {
  const [otpValue, setOtpValue] = useState('');

  const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
    setOtpValue(text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const { otpVerify } = useAuth();

  const handleSubmit = async () => {
    try {
      if (otpValue.length < 6) {
        toast.warning('Please enter a valid OTP (6 digits)');
        return;
      }
      // Proceed with submission logic here
      otpVerify(otpValue);
    } catch (error) {
      // console.error('Error:', error.message);
      // You can handle the error here, like showing a message to the user
    }
  };

  return (
    <Flex gap="middle" align="flex-start" vertical>
      <Title level={5}>OTP</Title>
      <Input.OTP length={6} {...sharedProps} />
      <Button onClick={handleSubmit}>Submit</Button>
    </Flex>
  );
};

export default App;
