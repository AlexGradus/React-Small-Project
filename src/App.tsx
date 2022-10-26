import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { About } from './pages/AboutUs';
import { Notfound } from './pages/NotFound';
import { Header } from './pages/Header';

import { PrepareCards } from './pages/MainestPage';
import './reset.css';
import './App.css';

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <section className="section">
          <Routes>
            <Route path="/" element={<PrepareCards />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </section>
      </div>
    </>
  );
}

export default App;
