import React, { useState } from 'react';
import { API_BASE, whatsappUrl } from '../utils';

export default function ContactPage({ data }) {
  const { settings } = data;
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const waUrl = settings?.whatsapp_number ? whatsappUrl(settings.whatsapp_number, settings.whatsapp_message) : null;

  return (
    <section id="contact" className="section contact-section contact-page">
      <div className="container">
        <h2 className="section-title">📞 Get In Touch</h2>
        <p className="section-subtitle">We'd love to hear from you — visit, call, or message us</p>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Visit or Contact Us</h3>

            {settings?.address && (
              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>
                <div className="contact-detail-text">{settings.address}</div>
              </div>
            )}
            {settings?.phone_number && (
              <div className="contact-detail">
                <div className="contact-detail-icon">📱</div>
                <div className="contact-detail-text"><a href={`tel:${settings.phone_number}`}>{settings.phone_number}</a></div>
              </div>
            )}
            {settings?.email && (
              <div className="contact-detail">
                <div className="contact-detail-icon">✉️</div>
                <div className="contact-detail-text"><a href={`mailto:${settings.email}`}>{settings.email}</a></div>
              </div>
            )}

            <div className="social-links">
              {settings?.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="social-btn insta">📷 Instagram</a>}
              {settings?.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="social-btn fb">Facebook</a>}
              {waUrl && <a href={waUrl} target="_blank" rel="noreferrer" className="social-btn wa">💬 WhatsApp</a>}
            </div>

            {settings?.google_maps_embed_url && (
              <div className="map-wrap">
                <iframe src={settings.google_maps_embed_url} title="Shop Location" allowFullScreen loading="lazy" />
              </div>
            )}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <div className="input-group">
              <input name="name" placeholder="Your Name *" required value={form.name} onChange={handle} />
            </div>
            <div className="input-group">
              <input name="phone" type="tel" placeholder="Phone Number *" required value={form.phone} onChange={handle} />
            </div>
            <div className="input-group">
              <input name="email" type="email" placeholder="Email (optional)" value={form.email} onChange={handle} />
            </div>
            <div className="input-group">
              <textarea name="message" placeholder="Your message..." rows={4} value={form.message} onChange={handle} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
              {status === 'sending' ? '⏳ Sending...' : '🚀 Send Message'}
            </button>
            {status === 'success' && <div className="form-success">✅ Message sent! We'll contact you soon.</div>}
            {status === 'error' && <div className="form-error">❌ Something went wrong. Try WhatsApp instead.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
