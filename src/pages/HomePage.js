import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { imgUrl, whatsappUrl } from '../utils';

function HeroSection({ settings }) {
  const waUrl = whatsappUrl(settings?.whatsapp_number, settings?.whatsapp_message);
  return (
    <section id="home" className="hero"
      style={imgUrl(settings?.hero_image) ? {
        backgroundImage: `url(${imgUrl(settings.hero_image)})`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      } : {}}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-eyebrow">🌟 {settings?.shop_name || 'Welcome to Our Shop'}</div>
        <h1>{settings?.hero_heading || 'New Collection Just Arrived!'}</h1>
        <p className="hero-sub">{settings?.hero_subheading || settings?.tagline || 'Discover the latest trends in fashion and style'}</p>
        <div className="hero-btns">
          <a href="#products" className="btn btn-primary">🛍️ Shop Now</a>
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp">💬 WhatsApp Us</a>
        </div>
      </div>
    </section>
  );
}

function FeaturesStrip() {
  const features = [
    { icon: '🚚', label: 'Free Delivery', color: 'pink' },
    { icon: '💯', label: 'Quality Guaranteed', color: 'gold' },
    { icon: '🔄', label: 'Easy Returns', color: 'purple' },
    { icon: '💬', label: 'WhatsApp Support', color: 'green' },
  ];
  return (
    <div className="features-strip">
      <div className="features-inner">
        {features.map((f, i) => (
          <div className="feature-item" key={i}>
            <div className={`feature-icon ${f.color}`}>{f.icon}</div>
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OffersSection({ offers }) {
  if (!offers?.length) return null;
  return (
    <section id="offers" className="section offers-section">
      <div className="container">
        <h2 className="section-title">🔥 Hot Offers</h2>
        <p className="section-subtitle">Limited time deals — grab them before they're gone!</p>
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card"
              style={offer.background_color ? { background: offer.background_color } : {}}>
              {imgUrl(offer.image) && <img src={imgUrl(offer.image)} alt={offer.title} className="offer-bg-img" />}
              <div className="offer-text">
                {offer.discount_text && <div className="offer-discount">{offer.discount_text}</div>}
                <h3>{offer.title}</h3>
                {offer.subtitle && <p>{offer.subtitle}</p>}
                {offer.valid_till && <small>⏰ Valid till: {offer.valid_till}</small>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, whatsappNumber }) {
  const waUrl = whatsappUrl(whatsappNumber, `Hi! I'm interested in: ${product.name} (₹${product.price})`);
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {imgUrl(product.image)
          ? <img src={imgUrl(product.image)} alt={product.name} />
          : <div className="product-img-placeholder">👗<span style={{fontSize:'0.75rem', color:'#aaa'}}>No Image</span></div>
        }
        {product.discount_percent && <span className="badge badge-sale">{product.discount_percent}% OFF</span>}
        {product.is_new_arrival && !product.discount_percent && <span className="badge badge-new">✨ NEW</span>}
      </div>
      <div className="product-info">
        {product.category_name && <span className="product-cat">{product.category_name}</span>}
        <h4>{product.name}</h4>
        <div className="product-price">
          <span className="price">₹{product.price}</span>
          {product.original_price && <span className="price-original">₹{product.original_price}</span>}
        </div>
        <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm">
          💬 Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}

function ProductsSection({ featured, newArrivals, settings }) {
  const [activeTab, setActiveTab] = useState('featured');
  const products = activeTab === 'featured' ? featured : newArrivals;
  return (
    <section id="products" className="section products-section">
      <div className="container">
        <h2 className="section-title">Our Collection</h2>
        <p className="section-subtitle">Handpicked styles just for you</p>
        <div className="tabs">
          <button className={`tab ${activeTab==='featured'?'active':''}`} onClick={()=>setActiveTab('featured')}>⭐ Featured</button>
          <button className={`tab ${activeTab==='new'?'active':''}`} onClick={()=>setActiveTab('new')}>🆕 New Arrivals</button>
        </div>
        {products?.length
          ? <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p} whatsappNumber={settings?.whatsapp_number} />)}
            </div>
          : <p className="empty-msg">🛍️ Products coming soon! Contact us on WhatsApp to know more.</p>
        }
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    { icon: '👗', title: 'Trendy Styles', desc: 'Latest fashion designs updated every week' },
    { icon: '💎', title: 'Premium Quality', desc: 'Only the best fabrics and materials' },
    { icon: '💰', title: 'Best Prices', desc: 'Affordable prices for everyone' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'Quick delivery right to your doorstep' },
    { icon: '🤝', title: 'Trusted Shop', desc: 'Thousands of happy customers' },
    { icon: '📱', title: 'Easy Ordering', desc: 'Order instantly via WhatsApp' },
  ];
  return (
    <section className="section why-section">
      <div className="container">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div className="why-card" key={i}>
              <span className="why-icon">{r.icon}</span>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <section className="section testimonials-section">
      <div className="container">
        <h2 className="section-title">💬 Happy Customers</h2>
        <p className="section-subtitle">What our customers love about us</p>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card">
              <div className="stars">
                {Array.from({length:5}).map((_,i) => (
                  <span key={i} className={i < t.rating ? 'filled' : 'empty'}>★</span>
                ))}
              </div>
              <p>{t.review}</p>
              <div className="testimonial-author">
                {imgUrl(t.photo)
                  ? <img src={imgUrl(t.photo)} alt={t.customer_name} />
                  : <div className="author-avatar">{t.customer_name[0]}</div>
                }
                <div>
                  <strong>{t.customer_name}</strong>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ gallery, instagramUrl }) {
  if (!gallery?.length) return null;
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h2 className="section-title">📸 Our Gallery</h2>
        {instagramUrl && (
          <p className="gallery-insta">
            Follow us on <a href={instagramUrl} target="_blank" rel="noreferrer">📷 Instagram</a> for daily updates!
          </p>
        )}
        <div className="gallery-grid">
          {gallery.map(img => (
            <div key={img.id} className="gallery-item">
              <img src={imgUrl(img.image)} alt={img.caption} />
              <div className="gallery-overlay">
                {img.caption && <div className="gallery-caption">{img.caption}</div>}
              </div>
            </div>
          ))}
        </div>
        {instagramUrl && (
          <div style={{textAlign:'center', marginTop:'2.5rem'}}>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              📷 View More on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactTeaser() {
  return (
    <section className="section contact-teaser-section">
      <div className="container contact-teaser-inner">
        <div>
          <h2 className="section-title" style={{textAlign:'left', marginBottom:'0.5rem'}}>Have Questions?</h2>
          <p className="section-subtitle" style={{textAlign:'left', margin:0}}>
            Visit our Contact page for address, map, and a quick message form.
          </p>
        </div>
        <Link to="/contact" className="btn btn-primary">📞 Contact Us</Link>
      </div>
    </section>
  );
}

export default function HomePage({ data }) {
  const { settings, offers, featured_products, new_arrivals, testimonials, gallery } = data;
  return (
    <>
      <HeroSection settings={settings} />
      <FeaturesStrip />
      <OffersSection offers={offers} />
      <ProductsSection featured={featured_products} newArrivals={new_arrivals} settings={settings} />
      <WhySection />
      <TestimonialsSection testimonials={testimonials} />
      <GallerySection gallery={gallery} instagramUrl={settings?.instagram_url} />
      <ContactTeaser />
    </>
  );
}
