import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DynamicPage from './components/DynamicPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<DynamicPage defaultSlug="home" />} />
          <Route path="/page/:slug" element={<DynamicPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
