import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Base_Url/Base_Url';

function Receipt() {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    async function fetchPaymentInfo() {
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get('id');

      try {
        const response = await axios.get(`${BASE_URL}/payment?id=${paymentId}`);
        if (response.status === 200) {
          setPaymentInfo(response.data);
        } else {
          console.log('Error fetching payment info');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPaymentInfo();
  }, [location.search]);

  if (!paymentInfo) {
    return <div>Loading payment info...</div>;
  }

  return (
    <div>
      <h1>Payment Receipt</h1>
      <p>
        <strong>ID:</strong> {paymentInfo.id}
      </p>
      <p>
        <strong>Amount:</strong> {paymentInfo.amount} {paymentInfo.currency}
      </p>
      <p>
        <strong>Description:</strong> {paymentInfo.description}
      </p>
      <p>
        <strong>Date:</strong> {paymentInfo.date}
      </p>
      <p>
        <strong>Merchant:</strong> {paymentInfo.legal_entity}
      </p>
    </div>
  );
}

export default Receipt;
