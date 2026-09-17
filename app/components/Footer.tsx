'use client';

import React from 'react';

export default function FooterSection() {

  const scrollToSection = (e: React.SyntheticEvent, footerSection: string) => {
    e.preventDefault(); // URL mein # aane se rokta hai
    const element = document.getElementById(footerSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footerSection" className="bg-amber-950 text-amber-100 relative overflow-hidden pt-20 pb-12 border-t border-amber-900">
      {/* Background subtle glowing shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-950/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-amber-900/80">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-serif text-white tracking-wide">
              Madhav<span className="text-amber-500">Radha</span>
            </h3>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              Exquisite handcrafted deity poshak, heavy zardozi, and pure shringar vastra directly from the traditional artisans of Aligarh. Adorning your beloved deities with supreme devotion.
            </p>
            <div className="pt-2 text-xs text-amber-300 font-medium">
              📍 Handcrafted in Aligarh, Uttar Pradesh
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold font-serif text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-amber-200/80 font-medium">
              <li>
                <a 
                  href="#product" 
                  onClick={(e) => scrollToSection(e, 'product')} 
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>›</span> Divine Collection
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => scrollToSection(e, 'features')} 
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>›</span> Heritage Craftsmanship
                </a>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  onClick={(e) => scrollToSection(e, 'reviews')} 
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>›</span> Devotees Love
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => scrollToSection(e, 'faq')} 
                  className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>›</span> FAQ & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Divine Seva Categories */}
          <div>
            <h4 className="text-base font-bold font-serif text-white uppercase tracking-wider mb-5">
              Sacred Categories
            </h4>
            <ul className="space-y-3 text-sm text-amber-200/80 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Laddu Gopal Heavy Poshak</li>
              <li className="hover:text-white transition-colors cursor-pointer">Radha Rani Bridal Lehenga</li>
              <li className="hover:text-white transition-colors cursor-pointer">Silk Velvet Vastra</li>
              <li className="hover:text-white transition-colors cursor-pointer">Mor Pankh Designer Sets</li>
              <li className="hover:text-white transition-colors cursor-pointer">Custom Deity Shringar</li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Connect */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-serif text-white uppercase tracking-wider mb-5">
              Stay Connected
            </h4>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              Naye sacred collections aur festive offers ki update sabse pehle paane ke liye judein.
            </p>
            
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Subscribed successfully! 🙏'); }} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-amber-900/50 border border-amber-800 text-sm text-white placeholder-amber-400/60 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-amber-700 py-3 text-white font-semibold text-sm hover:bg-amber-600 transition-all cursor-pointer shadow-md"
              >
                Join Devotee Circle ✨
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/70 font-medium">
          <p>© {new Date().getFullYear()} Madhav Radha. All rights reserved. Crafted with pure devotion. 🙏</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Seva</span>
            <span className="hover:text-white cursor-pointer transition">Shipping & Return</span>
          </div>
        </div>

      </div>
    </footer>
  );
}