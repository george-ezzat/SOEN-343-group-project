import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home.tsx'
import Tracking from "./Ordertracking.tsx"
import AboutUs from "./AboutUs.tsx"
import Purchase from "./product_purchase.tsx"

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
