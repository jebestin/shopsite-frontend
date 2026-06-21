import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { API_BASE } from './utils';
import { AnnouncementBar, Navbar, Footer, WhatsAppButton } from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/shop-data/`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!data?.settings) return;
    const s = data.settings;
    if (s.primary_color) document.documentElement.style.setProperty('--primary', s.primary_color);
    if (s.secondary_color) document.documentElement.style.setProperty('--secondary', s.secondary_color);
    if (s.accent_color) document.documentElement.style.setProperty('--accent', s.accent_color);
    if (s.shop_name) document.title = s.shop_name;
  }, [data]);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading your shop...</p>
    </div>
  );
  if (error) return (
    <div className="loading-screen">
      <p>⚠️ Cannot connect to server. Make sure the backend is running and reachable.</p>
    </div>
  );

  const { settings, announcements } = data;

  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="app">
        <AnnouncementBar announcements={announcements} />
        <Navbar settings={settings} />

        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/about" element={<AboutPage data={data} />} />
          <Route path="/contact" element={<ContactPage data={data} />} />
        </Routes>

        <Footer settings={settings} />
        <WhatsAppButton number={settings?.whatsapp_number} message={settings?.whatsapp_message} />
      </div>
    </BrowserRouter>
  );
}
