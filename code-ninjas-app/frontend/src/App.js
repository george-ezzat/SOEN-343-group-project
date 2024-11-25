import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home.jsx'
import Tracking from './components/OrderTracking/OrderTracking.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'
import Purchase from './components/ProductPurchase/ProductPurchase.jsx'
import Payment from './components/ProductPurchase/PaymentForm.jsx'
import TransactionApproved from './components/ProductPurchase/TransactionApproved.jsx'
import GetQuotePage from './components/QuotePage/GetQuotePage'
import AdminView from './components/Admin/AdminView.jsx'
// import ModifyUsers from '../pages/ModifyUsers.tsx'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />{' '}
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/product_purchase' element={<Purchase />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/transactionapproved' element={<TransactionApproved />} />
          <Route path="/get-quote" element={<GetQuotePage />} />
          <Route path='/adminview' element={<AdminView />} />
          {/* <Route path='/modifyusers' element={<ModifyUsers />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
