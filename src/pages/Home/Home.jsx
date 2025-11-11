// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import tendrLogo from '../../assets/logos/tendr-logo-secondary.png';
import PlatformFlow from '../../components/PlatformFlow';
import BasicSpeedDial from '../../components/BasicSpeedDial';
import Footer from '../../components/Footer';
import { easeIn, motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import corpo from '../../assets/ui/corpo.jpg';
import CorporateLogin from '../../components/corporateEventPlanning.jsx';
import JourneyFlow from '../../components/JourneyFlow';
import Navbar from '../../components/Navbar.jsx';

// WhatsApp icon
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo should navigate to the home route (works from other pages as well)
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open('https://wa.me/9211668427', '_blank');
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  // removed sign up - not needed per requirements

  const handleBookingSelect = (e) => {
    const val = e.target.value;
    if (!val) return;
    if (val === 'corporate') {
      navigate('/corporate/login'); // your corporate booking route
    } else if (val === 'celebration') {
      navigate('/booking'); // general booking / choose booking
    }
    // reset select to default (optional)
    e.target.selectedIndex = 0;
  };

  const handleVendorSelect = (e) => {
    const val = e.target.value;
    if (!val) return;
    if (val === 'register') {
      navigate('/vendor/register');
    } else if (val === 'portfolio') {
      navigate('/listings'); // vendor listings / portfolio area
    }
    e.target.selectedIndex = 0;
  };

  const handledropdownChange = (event) => {
    const selectedValue = event.target.value;
    if (!selectedValue) return;
    if (selectedValue === 'timeline') {
      navigate('/timeline-picker');
    } else if (selectedValue === 'aftermovie') {
      navigate('/aftermovie');
    } else if (selectedValue === 'checklist') {
      navigate('/checklist-picker');
    } else if (selectedValue === 'Budget Allocator') {
      navigate('/budget-allocator');
    } else if (selectedValue === 'invitation') {
      navigate('/invitation');
    } else if (selectedValue === 'our-products') {
      navigate('/gift-hampers-cakes');
    }
    event.target.selectedIndex = 0;
  };

  const handleGiftHampersClick = (e) => {
    e.preventDefault();
    navigate('/gift-hampers-cakes');
  };

  const handlePartnerClick = (e) => {
    e.preventDefault();
    navigate('/vendor/register');
  };

  const handleCorporateClick = (e) => {
    e.preventDefault();
    navigate('/corporate-signup');
  };

  const services = [
    { id: 1, title: 'Photography', image: 'https://artincontext.org/wp-content/uploads/2022/07/What-Is-the-Definition-of-Fine-Art-Photography.avif' },
    { id: 2, title: 'Entertainment', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop' },
    { id: 3, title: 'Decor', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop' },
    { id: 4, title: 'Catering', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop' }
  ];

  const events = [
    { id: 1, title: 'Dinner Eve', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=400&fit=crop' },
    { id: 2, title: 'Family Gathering', image: 'https://belvederebanquets.com/wp-content/uploads/2024/02/Belvedere-Family-Reunion-Ideas-Create-New-Memories-With-Fun-Activities.jpg' },
    { id: 3, title: 'Lunch Celebrations', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=500&h=400&fit=crop' },
    { id: 4, title: 'Marriage Ceremony', image: 'https://seasons5.com.au/wp-content/uploads/2024/06/luxury-wedding-trends.jpg' },
    { id: 5, title: 'Magical Ring Ceremony', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=400&fit=crop' },
    { id: 6, title: 'Birthday Bash', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=400&fit=crop' }
  ];

  const features = [
    { id: 1, icon: '🏢', title: 'Corporate Events', description: 'Meetings, conferences, and seminars' },
    { id: 2, icon: '🎯', title: 'Team Building', description: 'Engaging activities and workshops' },
    { id: 3, icon: '🏆', title: 'Award Ceremonies', description: 'Recognition events and galas' }
  ];

  

  return (
    <div className="App">
      {/* Speed dial (floating) */}
      <div className={`sticky bottom-2 right-1 z-50 transform transition-all duration-500 ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}>
        <BasicSpeedDial />
      </div>

      <Navbar/>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Experience Event Planning</h1>
          <p className="hero-subtitle">We Curate You Celebrate</p>
          <button className="cta-button" onClick={() => navigate('/booking')}> Booking </button>
        </div>
      </section>

      <JourneyFlow />


      {/* Corporate Booking Section */}
      <CorporateLogin />
      {/* Events Gallery */}
      <section className="events-section" id="events">
  <div className="events-container">
    <div className="events-header">
      <p className="events-subtitle">A tour of events we have executed.</p>
      <h2 className="events-title">A Glimpse Into Our Events</h2>
    </div>

    <div className="events-grid">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <div
            className="event-image"
            style={{ backgroundImage: `url('${event.image}')` }}
          >
            <div className="event-overlay">
              <h3>{event.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Partner Section */}
<section className="partner-section">
  <div className="partner-overlay"></div>

  <div className="partner-content">
    <h2>Become a Partner</h2>
    <p>3 easy steps to join the tendr!</p>
    <button
      className="partner-btn"
      onClick={() => navigate("/vendor/register")}
    >
      START HERE 
    </button>

    {/* Steps container */}
    <div className="partner-steps">
      <div className="step">
        <div className="step-circle">1</div>
        <h4>Register</h4>
        <p>Join our network of event professionals</p>
      </div>

      <div className="step">
        <div className="step-circle">2</div>
        <h4>Verify</h4>
        <p>Complete our verification process</p>
      </div>

      <div className="step">
        <div className="step-circle">3</div>
        <h4>Grow</h4>
        <p>Start receiving bookings and grow your business</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home