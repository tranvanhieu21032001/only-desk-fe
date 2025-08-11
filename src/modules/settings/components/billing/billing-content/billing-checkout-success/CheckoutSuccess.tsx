import { Image, Button } from 'antd';
import icSuccess from '@/assets/icons/billing/ic-payment-success.svg';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;  /* full chiều ngang */
  height: 100vh; /* full chiều cao */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #01A601; /* xanh lá */
    margin-top: 20px;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin: 8px 0 24px;
    max-width: 500px;
  }
`;

const CheckoutSuccess = () => {
  const handleGoHome = () => {
    window.location.href = '/'; // hoặc navigate('/')
  };

  return (
    <Wrapper>
      <Image src={icSuccess} alt="success" preview={false} width={120} />
      <h1>Payment Successful</h1>
      {/* <Button type="primary" size="large" onClick={handleGoHome}>
        Back to Home
      </Button> */}
    </Wrapper>
  );
};

export default CheckoutSuccess;
