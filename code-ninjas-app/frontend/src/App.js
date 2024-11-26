import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home.jsx'
import Tracking from './components/OrderTracking/OrderTracking.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'
import Purchase from './components/ProductPurchase/ProductPurchase.jsx'
import Payment from './components/ProductPurchase/PaymentForm.jsx'
import TransactionApproved from './components/ProductPurchase/TransactionApproved.jsx'
import AdminView from './components/Admin/AdminView.jsx'
import DeliveryPage from './components/Delivery/Delivery.jsx'
import ModifyUsers from './components/Admin/ModifyUsers.jsx'
import ModifyOrders from './components/Admin/ModifyOrders.jsx'
import { AuthProvider } from './components/AuthProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <AuthProvider>
        <Routes>
          <Route index element={<Home />} />{' '}
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/product_purchase' element={<Purchase />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/transactionapproved' element={<TransactionApproved />} />
          <Route path='/adminview' element={<ProtectedRoute element={<AdminView />} adminOnly />} />
          <Route path='/delivery' element={<ProtectedRoute element={<DeliveryPage />} />} />
          <Route path='/modifyusers' element={<ProtectedRoute element={<ModifyUsers />} adminOnly />} />
          <Route path='/modifyorders' element={<ProtectedRoute element={<ModifyOrders />} adminOnly />} />
        </Routes>
       </AuthProvider>
      </BrowserRouter> 
    </div>
  );
}

export default App;
