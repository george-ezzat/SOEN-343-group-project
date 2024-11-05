import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home.jsx'
import Tracking from './components/OrderTracking/OrderTracking.jsx'
import AboutUs from './components/AboutUs/AboutUs.jsx'
import Purchase from './components/ProductPurchase/ProductPurchase.jsx'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />{' '}
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/tracking' element={<Tracking />} />
          <Route path='/product_purchase' element={<Purchase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
