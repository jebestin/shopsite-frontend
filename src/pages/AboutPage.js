import React from 'react';
import { imgUrl, whatsappUrl } from '../utils';

export default function AboutPage({ data }) {
  const { settings } = data;

  return (
    <section className="section about-page">
      <div className="container">
        <h2 className="section-title">{settings?.about_heading || 'About Us'}</h2>
        <p className="section-subtitle">Get to know {settings?.shop_name || 'our shop'}</p>

        <div className="about-grid">
          <div className="about-image-wrap">
            {imgUrl(settings?.about_image)
              ? <img src={imgUrl(settings.about_image)} alt={settings?.shop_name} />
              : imgUrl(settings?.hero_image)
                ? <img src={imgUrl(settings.hero_image)} alt={settings?.shop_name} />
                : <div className="about-image-placeholder">🏪</div>
            }
          </div>

          <div className="about-text-wrap">
            <h3>{settings?.shop_name}</h3>
            {settings?.tagline && <p className="about-tagline">{settings.tagline}</p>}

            <p className="about-body">
              {settings?.about_text ||
                `Welcome to ${settings?.shop_name || 'our shop'}! We are passionate about bringing you the best products with great service.`}
            </p>

            {settings?.years_in_business && (
              <div className="about-stat-badge">
                <span className="num">{settings.years_in_business}+</span>
                <span className="label">Years in Business</span>
              </div>
            )}

            {settings?.whatsapp_number && (
              <a
                href={whatsappUrl(settings.whatsapp_number, settings.whatsapp_message)}
                target="_blank" rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ marginTop: '1.5rem' }}
              >
                💬 Chat With Us
              </a>
            )}
          </div>
        </div>

        <div className="why-grid about-values-grid">
          <div className="why-card">
            <span className="why-icon">🎯</span>
            <h4>Our Mission</h4>
            <p>To provide quality products at fair prices, with service our customers can trust.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">🤝</span>
            <h4>Our Promise</h4>
            <p>Every customer is treated like family. Your satisfaction is our priority.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">📍</span>
            <h4>Visit Us</h4>
            <p>{settings?.address || 'See our full address on the Contact page.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
