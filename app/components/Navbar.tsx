'use client';

import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  // CMS se Global data (Logo & Cart text) fetch karne ke liye state
  const [globalData, setGlobalData] = useState({
    siteName: 'Madhav',
    siteNameHighlight: 'Radha',
    cartButtonText: 'Add to Cart',
  });

  useEffect(() => {
    async function fetchGlobalSettings() {
      try {
        const res = await fetch(`${API_URL}/api/global`);
        const json = await res.json();
        if (json && json.data) {
          setGlobalData({
            siteName: json.data.siteName || 'Madhav',
            siteNameHighlight: json.data.siteNameHighlight || 'Radha',
            cartButtonText: json.data.cartButtonText || 'Add to Cart',
          });
        }
      } catch (error) {
        console.error('Error fetching global settings from Strapi:', error);
      }
    }

    fetchGlobalSettings();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-amber-100 sticky top-0 bg-amber-50/95 backdrop-blur-md z-50 shadow-xs">
      
      {/* Logo (Dynamic from Strapi CMS) */}
      <h1 className="text-2xl font-bold tracking-tight text-amber-950 font-serif cursor-pointer">
        {globalData.siteName}<span className="text-amber-600">{globalData.siteNameHighlight}</span>
      </h1>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex gap-8 font-medium text-amber-900/80">
        <a 
          href="#product" 
          onClick={(e) => scrollToSection(e, 'product')} 
          className="cursor-pointer hover:text-amber-700 transition"
        >
          Poshak
        </a>
        <a 
          href="#features" 
          onClick={(e) => scrollToSection(e, 'features')} 
          className="cursor-pointer hover:text-amber-700 transition"
        >
          Handcrafted
        </a>
        <a 
          href="#reviews" 
          onClick={(e) => scrollToSection(e, 'reviews')} 
          className="cursor-pointer hover:text-amber-700 transition"
        >
          Devotees Love
        </a>
      </nav>

      {/* Desktop Cart Button with CMS Text */}
      <div className="hidden md:block">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative rounded-xl bg-amber-700 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-amber-800 transition cursor-pointer flex items-center gap-2"
        >
          🛒 {globalData.cartButtonText} 
          <span className="bg-amber-900 px-2 py-0.5 rounded-full text-xs font-bold text-amber-100">
            {totalItems}
          </span>
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden text-amber-950 focus:outline-none p-2 cursor-pointer"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-amber-50/95 backdrop-blur-2xl border-b border-amber-200 shadow-xl py-6 px-8 flex flex-col gap-5 md:hidden">
          <a 
            href="#product" 
            onClick={(e) => scrollToSection(e, 'product')} 
            className="text-amber-950 font-medium text-lg hover:text-amber-700 pb-2 border-b border-amber-100"
          >
            Poshak
          </a>
          <a 
            href="#features" 
            onClick={(e) => scrollToSection(e, 'features')} 
            className="text-amber-950 font-medium text-lg hover:text-amber-700 pb-2 border-b border-amber-100"
          >
            Handcrafted
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => scrollToSection(e, 'reviews')} 
            className="text-amber-950 font-medium text-lg hover:text-amber-700 pb-2 border-b border-amber-100"
          >
            Devotees Love
          </a>
          <button 
            onClick={() => {
              setIsOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full rounded-xl bg-amber-700 px-5 py-3 text-white font-medium shadow-md hover:bg-amber-800 transition text-center mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            🛒 {globalData.cartButtonText} 
            <span className="bg-amber-900 px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-100">
              {totalItems}
            </span>
          </button>
        </div>
      )}

    </header>
  );
}