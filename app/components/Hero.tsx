'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function HeroSection() {
  // CMS se aane wale text ke liye default fallback state
  const [heroContent, setHeroContent] = useState({
    tagline: 'Handcrafted in Aligarh with Pure Devotion',
    heading: 'Madhav Radha Divine Vastra & Aligarh for Your Beloved Deity',
    subheading: 'Adorn your deities with exquisitely handcrafted poshak, heavy zardozi work, and pure fabrics straight from the traditional artisans of Aligarh.',
    primaryButtonText: 'Explore Collection',
    secondaryButtonText: 'Our Heritage Craft',
    feature1: '🪡 Direct from Aligarh Artisans',
    feature2: '🌟 Premium Zardozi & Silk',
    feature3: '🙏 Made with Purity',
  });

  const [slides, setSlides] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Strapi se Hero text aur Slides fetch karne ke liye useEffect
  useEffect(() => {
    async function fetchHeroData() {
      try {
        // 1. Hero Text fetch karna (Single Type)
        const heroRes = await fetch(`${API_URL}/api/hero`);
        const heroJson = await heroRes.json();
        
        if (heroJson && heroJson.data) {
          setHeroContent({
            tagline: heroJson.data.tagline || heroContent.tagline,
            heading: heroJson.data.heading || heroContent.heading,
            subheading: heroJson.data.subheading || heroContent.subheading,
            primaryButtonText: heroJson.data.primaryButtonText || heroContent.primaryButtonText,
            secondaryButtonText: heroJson.data.secondaryButtonText || heroContent.secondaryButtonText,
            feature1: heroJson.data.feature1 || heroContent.feature1,
            feature2: heroJson.data.feature2 || heroContent.feature2,
            feature3: heroJson.data.feature3 || heroContent.feature3,
          });
        }

        // 2. Hero Slides fetch karna (Collection Type)
        const slidesRes = await fetch(`${API_URL}/api/hero-slides?populate=*`);
        const slidesJson = await slidesRes.json();
        
        if (slidesJson && slidesJson.data && slidesJson.data.length > 0) {
          const formattedSlides = slidesJson.data.map((item: any) => {
           const imageUrl = item.image?.url 
    ? `${API_URL}${item.image.url}` 
    : '/images/hero_section_img2.jpg';

            return {
              id: item.id,
              title: item.title,
              subtitle: item.description || 'Exclusively Crafted for Laddu Gopal',
              price: item.price,
              originalPrice: item.originalPrice,
              image: imageUrl,
            };
          });
          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error('Error fetching hero data from Strapi:', error);
      }
    }

    fetchHeroData();
  }, []);

  // Auto slide timer
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToProduct = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProductNew = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elementNew = document.getElementById('features');
    if (elementNew) {
      elementNew.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentProduct = slides.length > 0 ? slides[currentIndex] : {
    title: 'Loading...',
    subtitle: 'Please wait',
    price: 0,
    originalPrice: 0,
    image: '/images/hero_section_img2.jpg'
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 py-20 lg:py-20">
      {/* Background soft divine glow shapes with slow pulse */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Dynamic Text from Strapi */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left transition-all duration-1000 transform translate-y-0 opacity-100">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase shadow-xs">
              ✨ {heroContent.tagline}
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight font-serif">
              {heroContent.heading}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              {heroContent.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#product"
                onClick={scrollToProduct}
                className="inline-flex items-center justify-center rounded-xl bg-amber-700 px-7 py-3.5 text-white font-medium shadow-lg shadow-amber-200 hover:bg-amber-800 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                {heroContent.primaryButtonText}
              </a>
              <a
                href="#features"
                onClick={scrollToProductNew}
                className="inline-flex items-center justify-center rounded-xl border border-amber-300 bg-white px-7 py-3.5 text-amber-900 font-medium hover:bg-amber-50 transition-all duration-300 cursor-pointer"
              >
                {heroContent.secondaryButtonText}
              </a>
            </div>

            <div className="pt-6 border-t border-amber-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 font-medium">
              <div>{heroContent.feature1}</div>
              <div>{heroContent.feature2}</div>
              <div>{heroContent.feature3}</div>
            </div>
          </div>

          {/* Right Column: Dynamic Image Slider from Strapi */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-amber-100 p-4 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-amber-300">
              
              <div className="w-full h-72 sm:h-80 bg-gradient-to-tr from-amber-100/60 to-orange-50 rounded-2xl overflow-hidden relative flex items-center justify-center p-0">
                
                {slides.length > 0 ? (
                  slides.map((item, index) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.title}
                      className={`absolute w-full h-full object-cover drop-shadow-xl transition-all duration-1000 ease-in-out transform ${
                        index === currentIndex 
                          ? 'opacity-100 scale-100 animate-slow-zoom' 
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400?text=Madhav+Radha+Poshak";
                      }}
                    />
                  ))
                ) : (
                  <div className="text-amber-900 text-sm font-medium">Loading Slides from CMS... ✨</div>
                )}
                
                <div className="absolute top-4 right-4 bg-amber-900/90 text-amber-100 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                  Gallery {currentIndex + 1} of {slides.length || 1}
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        currentIndex === idx ? 'w-8 bg-amber-700' : 'w-2 bg-amber-300'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

              <div className="mt-4 px-2 pb-1 flex justify-between items-center transition-all duration-500">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif">
                    {currentProduct.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {currentProduct.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  {currentProduct.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{currentProduct.originalPrice}
                    </span>
                  )}
                  <p className="text-lg sm:text-xl font-extrabold text-amber-700">
                    ₹{currentProduct.price}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}