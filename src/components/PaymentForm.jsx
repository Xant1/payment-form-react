import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../Base_Url/Base_Url';

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('1234 5678 9101 1121');
  const [cardHolder, setCardHolder] = useState('Palenshe Tugenshe');
  const [expirationDate, setExpirationDate] = useState('03/27');
  const [cvv, setCvv] = useState('1355');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const paymentData = {
      pan: cardNumber,
      holder: cardHolder,
      expire: expirationDate,
      cvv2: cvv,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/create-payment`,
        paymentData
      );

      if (response.status === 200) {
        const responseData = response.data;
        navigate(`/receipt?id=${responseData.id}`);
      } else {
        console.log('Payment creation failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(event) {
    const value = event.target.value;
    const newValue = value.replace(/[^0-9]/g, '');
    const formattedValue = newValue.replace(/\d{4}(?=\d)/g, '$& ');
    setCardNumber(formattedValue);
  }

  return (
    <main className='container'>
      <section className='ui'>
        <div className='container-left'>
          <form id='credit-card' onSubmit={handleSubmit}>
            <div className='number-container'>
              <label>CARD NUMBER</label>
              <input
                type='text'
                id='card-number'
                maxLength='16'
                placeholder='1234 5678 9101 1121'
                required
                onChange={handleInputChange}
              />
            </div>
            <div className='name-container'>
              <label>HOLDER</label>
              <input
                type='text'
                id='name-text'
                placeholder='Palenshe Tugenshe'
                required
                onChange={(event) => setCardHolder(event.target.value)}
              />
            </div>
            <div className='infos-container'>
              <div className='expiration-container'>
                <label>VALID-THRU</label>
                <input
                  type='text'
                  id='valid-thru-text'
                  maxLength='5'
                  placeholder='03/27'
                  required
                  onChange={(event) => setExpirationDate(event.target.value)}
                />
              </div>
              <div className='cvv-container'>
                <label>CVV</label>
                <br />
                <input
                  type='text'
                  id='cvv-text'
                  maxLength='4'
                  placeholder='1355'
                  required
                  onChange={(event) => setCvv(event.target.value)}
                />
              </div>
            </div>
            <input type='submit' value='pay' id='add' />
          </form>
        </div>
        <div className='container-right'>
          <div className='card'>
            <div className='intern'>
              <img
                className='approximation'
                src='aprox.png'
                alt='aproximation'
              />
              <div className='card-number'>
                <div className='number-vl'>{cardNumber}</div>
              </div>
              <div className='card-holder'>
                <label>Holder</label>
                <div className='name-vl'>{cardHolder}</div>
              </div>
              <div className='card-infos'>
                <div className='exp'>
                  <label>valid-thru</label>
                  <div className='expiration-vl'>{expirationDate}</div>
                </div>
                <div className='cvv'>
                  <label>CVV</label>
                  <div className='cvv-vl'>{cvv}</div>
                </div>
              </div>
              <img className='chip' src='chip.png' alt='chip' />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PaymentForm;
