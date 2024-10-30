import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home.tsx'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />{' '}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
