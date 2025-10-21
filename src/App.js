import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Portada from './components/Portada';
import Contenido from './components/Contenido';
import Beneficios from './components/Beneficios';
import Costos from './components/Costos';
import Demo from './components/Demo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Portada />} />
          <Route path="/contenido" element={<Contenido />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/costos" element={<Costos />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
