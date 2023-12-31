import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dmoney from './components/Dmoney';
import Ditems from './components/Ditems';
import Donate from './pages/donate';
function App() {
  return (
  <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate-money" element={<Dmoney />} />
        <Route path="/donate-items" element={<Ditems />} />
        <Route path="/donate" element={<Donate />} />
        </Routes>
    </>
  );
}

export default App;
