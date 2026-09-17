'use client';

import { useState, useEffect } from 'react';

export default function Features() {
  // CMS se data aane tak default fallback values
  const [featureSection, setFeatureSection] = useState({
    tagline: '✨ Our Heritage Craftsmanship',
    heading: 'Why Devotees Choose Madhav Radha',
    subheading: 'Tradition, purity, and exquisite artistry woven into every single thread.',
    features: [
      {
        id: 1,
        icon: '🪡',
        title: '100% Handcrafted',
        description: 'Har ek poshak ko Aligarh ke traditional aur expert artisans dwara badi safai aur lagan se hath se banaya jata hai.',
      },
      {
        id: 2,
        icon: '🌟',
        title: 'Pure Zardozi & Silk',
        description: 'Hum premium quality pure silk, velvet aur original gold/silver zardozi threads ka use karte hain jo saaloon-saal chalen.',
      },
      {
        id: 3,
        icon: '🙏',
        title: 'Purity & Devotion',
        description: 'Bhagwan ki seva ko dhyan mein rakhte hue, har vastra ko poori pavitrata aur niyam ke sath tayaar kiya jata hai.',
      },
      {
        id: 4,
        icon: '🛡️',
        title: 'Safe & Secure Delivery',
        description: 'Aapka divine parcel bina kisi nuksaan ke aapke ghar tak surakshit pahunche, iske liye special secure packaging ki jati hai.',
      },
    ],
  });

  // Strapi se FeatureSection data fetch karna
  useEffect(() => {
    async function fetchFeatureData() {
      try {
        const res = await fetch('http://localhost:1337/api/feature-section');
        const json = await res.json();

        if (json && json.data) {
          const item = json.data;
          setFeatureSection({
            tagline: item.tagline || featureSection.tagline,
            heading: item.heading || featureSection.heading,
            subheading: item.subheading || featureSection.subheading,
            features: [
              {
                id: 1,
                icon: item.card1Icon || featureSection.features[0].icon,
                title: item.card1Title || featureSection.features[0].title,
                description: item.card1Desc || featureSection.features[0].description,
              },
              {
                id: 2,
                icon: item.card2Icon || featureSection.features[1].icon,
                title: item.card2Title || featureSection.features[1].title,
                description: item.card2Desc || featureSection.features[1].description,
              },
              {
                id: 3,
                icon: item.card3Icon || featureSection.features[2].icon,
                title: item.card3Title || featureSection.features[2].title,
                description: item.card3Desc || featureSection.features[2].description,
              },
              {
                id: 4,
                icon: item.card4Icon || featureSection.features[3].icon,
                title: item.card4Title || featureSection.features[3].title,
                description: item.card4Desc || featureSection.features[3].description,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching feature section from Strapi:', error);
      }
    }

    fetchFeatureData();
  }, []);

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background subtle decorative glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 transform transition-all duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-xs tracking-widest uppercase shadow-xs">
            {featureSection.tagline}
          </span>
          <h2 className="text-3xl sm:text-3xl font-extrabold text-amber-950 font-serif mt-3">
            {featureSection.heading}
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            {featureSection.subheading}
          </p>
        </div>

        {/* Features Grid with Smooth Scale & Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureSection.features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-gradient-to-b from-amber-50/50 to-white p-8 rounded-3xl border border-amber-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-102 flex flex-col items-center text-center group"
            >
              {/* Icon Container with pop effect */}
              <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:bg-amber-200 transition-all duration-500">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-amber-950 font-serif mb-3 group-hover:text-amber-700 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}