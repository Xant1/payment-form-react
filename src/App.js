import './App.css';
import PaymentForm from './components/PaymentForm';
import Receipt from './components/Receipt';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<PaymentForm />} />
        <Route path='/receipt?id' element={<Receipt />} />
      </Routes>
    </div>
  );
}

export default App;
