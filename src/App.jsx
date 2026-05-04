import React, { useState, useEffect, useRef } from 'react';
import './App.css';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const WHATSAPP_NUMBER = '917019966984';
const WHATSAPP_MSG = encodeURIComponent(
  'Hello EdgeToo Solutions! I would like to enquire about your services.'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const PRODUCTS = [
  {
    name: 'Automation',
    tagline: 'Industrial Process Automation',
    description:
      'End-to-end industrial automation solutions to streamline your operations, reduce downtime and boost productivity.',
    icon: <AutomationIcon />,
  },
  {
    name: 'PLC',
    tagline: 'Programmable Logic Controllers',
    description:
      'PLC programming, integration, commissioning and maintenance across all major platforms — Siemens, Allen Bradley, Mitsubishi and more.',
    icon: <PLCIcon />,
  },
  {
    name: 'HMI',
    tagline: 'Human Machine Interface',
    description:
      'Intuitive HMI design and development for seamless operator control, real-time monitoring and process visualisation.',
    icon: <HMIIcon />,
  },
  {
    name: 'Vision',
    tagline: 'Machine Vision Systems',
    description:
      'AI-powered machine vision for quality inspection, defect detection, barcode reading and precision measurement.',
    icon: <VisionIcon />,
  },
  {
    name: 'Safety',
    tagline: 'Industrial Safety Systems',
    description:
      'Comprehensive safety solutions — risk assessments, safety PLCs, light curtains and emergency stop systems ensuring full compliance.',
    icon: <SafetyIcon />,
  },
  {
    name: 'IT Services',
    tagline: 'Digital & IT Infrastructure',
    description:
      'Networking, server infrastructure, IoT integration, cloud connectivity and digital transformation for smart factories.',
    icon: <ITIcon />,
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
function AutomationIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="28" cy="28" r="9" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="28" r="3.5" fill="currentColor" />
      <path d="M28 6v6M28 44v6M6 28h6M44 28h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M11.5 11.5l4.24 4.24M40.26 40.26l4.24 4.24M11.5 44.5l4.24-4.24M40.26 15.74l4.24-4.24"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 28a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

function PLCIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="12" width="44" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="13" y="19" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="32" y="19" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M13 34h8M23 34h8M33 34h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="42" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="28" cy="42" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="39" cy="42" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function HMIIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="8" width="46" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="11" y="14" width="34" height="20" rx="2" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 44h16M28 40v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="31" cy="24" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M17 20h8M17 24h6M17 28h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="31" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 28C5 28 13 14 28 14s23 14 23 14-8 14-23 14S5 28 5 28z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="28" cy="28" r="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="28" r="3" fill="currentColor" />
      <path d="M10 10l4 4M46 10l-4 4M10 46l4-4M46 46l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M28 6l20 8v14c0 10-8.5 18.5-20 22C16.5 46.5 8 38 8 28V14l20-8z"
        stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 28l5.5 5.5L36 22" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ITIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="10" width="44" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 34h44" stroke="currentColor" strokeWidth="2" />
      <circle cx="28" cy="40" r="1.5" fill="currentColor" />
      <rect x="12" y="16" width="32" height="12" rx="2" fill="currentColor" opacity="0.07" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 22h5M24 22h3M29 22h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 26h8M27 26h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 46h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 38v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.524 5.855L.057 23.885a.5.5 0 0 0 .606.63l6.218-1.633A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.952 9.952 0 0 1-5.121-1.414l-.367-.218-3.807 1.001.978-3.699-.239-.379A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" style={{ width: 16, height: 16 }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === '#contact') {
      onContactClick();
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={e => handleNavClick(e, '#home')}>
          <img src="/logo-icon-dark.png" alt="EdgeToo Solutions icon" className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            <span className="navbar__logo-name"><span className="navbar__logo-edge">EDGE</span><span className="navbar__logo-too">TOO</span></span>
            <span className="navbar__logo-sub">SOLUTIONS</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={e => handleNavClick(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="navbar__actions">
          <a
            href={WHATSAPP_URL}
            className="btn btn--whatsapp btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppSVG />
            WhatsApp
          </a>
          <button className="btn btn--primary btn--sm" onClick={onContactClick}>
            Get a Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}>
        <ul>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={e => handleNavClick(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__drawer-actions">
          <a
            href={WHATSAPP_URL}
            className="btn btn--whatsapp btn--full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppSVG />
            Chat on WhatsApp
          </a>
          <button className="btn btn--primary btn--full" onClick={() => { setMenuOpen(false); onContactClick(); }}>
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero({ onContactClick }) {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
      </div>
      <div className="hero__content container">
        <div className="hero__badge">Industrial Automation &amp; IT Solutions</div>
        <h1 className="hero__title">
          Smart Solutions for the{' '}
          <span className="hero__title--accent">Connected Industry</span>
        </h1>
        <p className="hero__subtitle">
          EdgeToo Solutions delivers cutting-edge Automation, PLC, HMI, Vision, Safety and
          IT services — empowering manufacturers to build smarter, safer and more efficient
          operations.
        </p>
        <div className="hero__tags">
          {['Automation', 'PLC', 'HMI', 'Vision', 'Safety', 'IT Services'].map(t => (
            <span key={t} className="hero__tag">{t}</span>
          ))}
        </div>
        <div className="hero__actions">
          <button className="btn btn--primary btn--lg" onClick={onContactClick}>
            Get a Free Quote
          </button>
          <a
            href={WHATSAPP_URL}
            className="btn btn--whatsapp btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppSVG />
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRODUCTS
───────────────────────────────────────────── */
function Products({ onContactClick }) {
  return (
    <section id="products" className="products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Products &amp; Services</h2>
          <p className="section-subtitle">
            Comprehensive industrial solutions tailored to your operational needs —
            from factory floor automation to enterprise IT infrastructure.
          </p>
        </div>
        <div className="products__grid">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="product-card">
              <div className="product-card__icon">{product.icon}</div>
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__tagline">{product.tagline}</p>
              <p className="product-card__desc">{product.description}</p>
              <button
                className="product-card__cta"
                onClick={onContactClick}
              >
                Enquire Now <ChevronRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHY EDGETOO
───────────────────────────────────────────── */
const WHY_ITEMS = [
  {
    icon: '🏭',
    title: 'Industry Expertise',
    desc: 'Years of hands-on experience across manufacturing, process and discrete industries.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    desc: 'Rapid project delivery without compromising on quality or reliability.',
  },
  {
    icon: '🔧',
    title: 'End-to-End Support',
    desc: 'From design and installation to commissioning, training and after-sales support.',
  },
  {
    icon: '🤝',
    title: 'Trusted Partner',
    desc: 'Long-term relationships built on transparency, reliability and results.',
  },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__text">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Why Choose EdgeToo Solutions?</h2>
            <p>
              EdgeToo Solutions is a technology-driven company specialising in industrial
              automation, control systems and IT services. We bridge the gap between OT and IT,
              helping businesses leverage the latest technologies to gain a competitive edge.
            </p>
            <p>
              Our team of certified engineers and IT professionals bring a wealth of
              cross-industry knowledge, delivering solutions that are robust, scalable and
              cost-effective.
            </p>
            <a
              href={WHATSAPP_URL}
              className="btn btn--outline btn--lg"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <WhatsAppSVG />
              Talk to an Expert
            </a>
          </div>
          <div className="about__cards">
            {WHY_ITEMS.map(item => (
              <div key={item.title} className="about__card">
                <span className="about__card-icon">{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ENQUIRY FORM
───────────────────────────────────────────── */
const EnquiryForm = React.forwardRef(function EnquiryForm(_, ref) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: '',
    'bot-field': '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // In local dev the Netlify form endpoint doesn't exist — simulate success
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', product: '', message: '', 'bot-field': '' });
      }, 800);
      return;
    }

    try {
      const body = new URLSearchParams({
        'form-name': 'enquiry',
        ...formData,
      }).toString();

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', product: '', message: '', 'bot-field': '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="enquiry" ref={ref}>
      <div className="container">
        <div className="enquiry__inner">
          {/* Left info panel */}
          <div className="enquiry__info">
            <span className="section-label section-label--light">Get In Touch</span>
            <h2 className="section-title section-title--white">Let's Talk About Your Project</h2>
            <p className="enquiry__info-text">
              Have a requirement? Fill in the form and our team will get back to you within 24 hours.
              Or reach us instantly on WhatsApp.
            </p>
            <div className="enquiry__contact-details">
              <a href={`mailto:info@edgetoo.in`} className="enquiry__contact-item">
                <span className="enquiry__contact-icon">✉️</span>
                <span>info@edgetoo.in</span>
              </a>
              <a href={WHATSAPP_URL} className="enquiry__contact-item" target="_blank" rel="noopener noreferrer">
                <span className="enquiry__contact-icon">📱</span>
                <span>+91 70199 66984</span>
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              className="btn btn--whatsapp btn--lg"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '2rem' }}
            >
              <WhatsAppSVG />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form panel */}
          <div className="enquiry__form-wrap">
            {status === 'success' ? (
              <div className="enquiry__success">
                <div className="enquiry__success-icon">✅</div>
                <h3>Enquiry Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button
                  className="btn btn--primary"
                  onClick={() => setStatus('idle')}
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form
                name="enquiry"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="enquiry__form"
                noValidate
              >
                {/* Netlify hidden inputs */}
                <input type="hidden" name="form-name" value="enquiry" />
                {/* Honeypot (spam trap) — hidden from real users */}
                <p style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human:
                    <input name="bot-field" value={formData['bot-field']} onChange={handleChange} />
                  </label>
                </p>

                <div className="form__row form__row--two">
                  <div className="form__group">
                    <label htmlFor="name">Full Name <span className="form__required">*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="email">Email Address <span className="form__required">*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form__row form__row--two">
                  <div className="form__group">
                    <label htmlFor="phone">Phone Number <span className="form__required">*</span></label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="product">Product / Service <span className="form__required">*</span></label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Automation">Automation</option>
                      <option value="PLC">PLC</option>
                      <option value="HMI">HMI</option>
                      <option value="Vision">Vision</option>
                      <option value="Safety">Safety</option>
                      <option value="IT Services">IT Services</option>
                      <option value="General">General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form__group">
                  <label htmlFor="message">Message <span className="form__required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Describe your project or requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {status === 'error' && (
                  <p className="form__error">
                    Something went wrong. Please try again or reach us on WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--full btn--lg"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ onContactClick }) {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <img src="/logo-icon-dark.png" alt="EdgeToo Solutions icon" className="footer__logo-icon" />
              <span className="footer__logo-text">
                <span className="footer__logo-edge">EDGE</span><span className="footer__logo-too">TOO</span>
                <span className="footer__logo-sub">SOLUTIONS</span>
              </span>
            </div>
            <p className="footer__tagline">
              Smart industrial solutions for the connected world — Automation, PLC, HMI,
              Vision, Safety &amp; IT Services.
            </p>
            <a
              href={WHATSAPP_URL}
              className="btn btn--whatsapp btn--sm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '1rem' }}
            >
              <WhatsAppSVG />
              WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul>
              {PRODUCTS.map(p => (
                <li key={p.name}>
                  <button onClick={() => scrollTo('#products')}>{p.name}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <button onClick={() => scrollTo(href)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <ul className="footer__contact">
              <li>
                <a href="mailto:info@edgetoo.in">✉️ info@edgetoo.in</a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  📱 +91 70199 66984
                </a>
              </li>
            </ul>
            <button
              className="btn btn--primary btn--sm"
              onClick={onContactClick}
              style={{ marginTop: '1.2rem' }}
            >
              Get a Quote
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} EdgeToo Solutions. All rights reserved.</p>
          <p>Designed &amp; built with ❤️ for Indian industry</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   FLOATING WHATSAPP BUTTON
───────────────────────────────────────────── */
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      className={`whatsapp-float${visible ? ' whatsapp-float--visible' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppSVG />
      <span className="whatsapp-float__tooltip">Chat with us!</span>
    </a>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <Navbar onContactClick={scrollToContact} />
      <Hero onContactClick={scrollToContact} />
      <Products onContactClick={scrollToContact} />
      <About />
      <EnquiryForm ref={contactRef} />
      <Footer onContactClick={scrollToContact} />
      <WhatsAppFloat />
    </div>
  );
}
